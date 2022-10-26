import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tasksURL } from 'src/app/shared/URLs';
import { map } from 'rxjs'
import { Task } from 'src/app/shared/task.model';
import { State } from 'src/app/shared/task-state.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  deleteTask(boardId: string, taskId: string) {
    return this.http.delete(`${tasksURL}${boardId}/${taskId}`)
  }

  updateTask(params: {
    boardId: string, 
    taskId: string, 
    taskName?: string, 
    taskState?: State}) {
    const {boardId, taskId, taskState, taskName} = params;

    let queryParams = {};

    if (taskName) {
      queryParams = {
        name: taskName
      }
    }
    if (taskState) {
      queryParams = {
        state: taskState
      }
    }

    return this.http.patch<{ok: boolean, message: string}>(`${tasksURL}${boardId}/${taskId}`, 
    queryParams)
  }
  
  getArchivedTasks() {
    return this.http.get<{tasks: Task[]}>(tasksURL + 'archive')
    .pipe(map(responseData => {
      const tasks = responseData.tasks.map(task => {
        const {_id, name, created_date, comments} = task;
        return {_id, name, created_date, comments}
      });
      return tasks
    }))
  }

  archiveTask(boardId: string, taskId: string) {
    return this.http.post(`${tasksURL}${boardId}/${taskId}`, {})
  }
}
