import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tasksURL } from 'src/app/shared/URLs';
import { map } from 'rxjs'
import { Task } from 'src/app/shared/task.model';
import { State } from 'src/app/shared/task-state.model';

interface Tasks {
  tasks: Task[]
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  fetchTasksForBoard(id: string) {
    return this.http.get<Tasks>(tasksURL + id)
  }

  getTasksByName(boardId: string, name: string) {
    if (!name) {
      return this.http.get<Tasks>(tasksURL + boardId)
    } else {
      return this.http.get<Tasks>(tasksURL + `${boardId}` + `/${name}` + '/find_tasks')
    }
    
  }

  getTaskById(id: string) {
    return this.http.get<{task: Task}>(`${tasksURL}${id}/task`)
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
    return this.http.get<{tasks: Task[]}>(tasksURL + 'archive')
    .pipe(map(responseData => {
      const tasks = responseData.tasks.map(task => {
        return {...task}
      });
      return tasks
    }))
  }

  archiveTask(boardId: string, taskId: string) {
    return this.http.post(`${tasksURL}${boardId}/${taskId}`, {})
  }
}
