import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tasksURL } from 'src/app/shared/utils/URLs';
import { map } from 'rxjs'
import { Task } from 'src/app/shared/models/task.model';
import { State } from 'src/app/shared/models/task-state.model';

interface Tasks {
  tasks: Task[]
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  fetchTasksForBoard(id: string) {
    return this.http.get<Task[]>(tasksURL + id)
  }

  getTasksByName(boardId: string, name: string) {
    if (!name) {
      return this.http.get<Task[]>(tasksURL + boardId)
    } else {
      return this.http.get<Task[]>(tasksURL + `${boardId}` + `/${name}` + '/find_tasks')
    }
  }

  getTaskById(id: string) {
    return this.http.get<Task>(`${tasksURL}${id}/task`)
  }

  deleteTask(boardId: string, taskId: string) {
    return this.http.delete(`${tasksURL}${boardId}/${taskId}`)
  }

  updateTask(params: {
    boardId: string, 
    taskId: string, 
    taskName?: string, 
    taskDesc?: string, 
    taskState?: State}) {
    const {boardId, taskId, taskState, taskDesc, taskName} = params;

    let queryParams = {};

    if (taskName) {
      queryParams = {
        name: taskName
      }
    }
    if (taskState) {
      queryParams = {
        ...queryParams,
        state: taskState
      }
    }
    if (taskDesc) {
      queryParams = {
        ...queryParams,
        description: taskDesc
      }
    }

    return this.http.patch<{ok: boolean, message: string}>(
      `${tasksURL}${boardId}/${taskId}`, 
      queryParams)
  }

  commentTask(id: string, message: string) {
    return this.http.patch(`${tasksURL}${id}/comment`, {
      message
    })
  }

  deleteComment(taskId: string, commentId: string) {
    return this.http.patch(`${tasksURL}${taskId}/delete_comment`, {
      commentId
    })
  }
  
  getArchivedTasks() {
    return this.http.get<Task[]>(tasksURL + 'archive')
  }

  archiveTask(boardId: string, taskId: string) {
    return this.http.post(`${tasksURL}${boardId}/${taskId}`, {})
  }
}
