import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Subject, mergeMap, take, exhaustMap } from 'rxjs';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';
import {boardsURL, tasksURL} from 'src/app/shared/URLs';
import { AuthService } from './auth.service';

interface Boards {
  boards: Board[]
}
interface Tasks {
  tasks: Task[]
}


@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boardsManagened = new Subject<Board[]>();
  tasksManaged = new Subject<{tasks: Task[], board: string}>();

  boards: Board[]  = [];

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }

  fetchBoards() {
    return this.http.get<Boards>(boardsURL,
      ).pipe(map(responseData => {
        const boards = responseData.boards.map(board => {
          const {_id, name, description, created_date, created_by} = board;
          // const date = this.transformDate(created_date);

          return {_id, name, description, created_date, created_by}
        });
        return boards
      }))

  }

  fetchBoardById(id: string) {
    return this.http.get<{board: Board}>(boardsURL + id)
  }

  fetchTasksForBoard(id: string) {
    return this.http.get<Tasks>(tasksURL + id)
  }

  findBoardsByName(name: string) {
    if (!name) {
      return this.http.get<Boards>(boardsURL)
      .pipe( 
        map(responseData => {
        const boards = responseData.boards.map(board => {
          const {_id, name, description, created_date, created_by} = board;
          // const date = this.transformDate(created_date);
            return {_id, name, description, created_date, created_by}
        });
        return boards
      })
      )
    } else {
          return this.http.get<Boards>(boardsURL + `/${name}` + '/find_name')
          .pipe(map(responseData => {
            const boards = responseData.boards.map(board => {
              const {_id, name, description, created_date, created_by} = board;
              // const date = this.transformDate(created_date);
    
              return {_id, name, description, created_date, created_by}
            });
            return boards
          }))
    }
  }

  findTaskByName(boardId: number, taskName: string) {
    // this.http.get()
  }


  addBoard(name: string, desc: string) {
    return this.http.post(boardsURL, 
      {
        name: name,
        description: desc
      }
    )
  }

  updateBoard(id: string, name: string) {
    return this.http.put(boardsURL + id, 
      {
        name: name
      }
    )
  }

  deleteBoard(id: string) {
    return this.http.delete(boardsURL + id)
  }

  addTaskToBoard(id: string, taskName: string, state: string) {
    return this.http.post(tasksURL + id, {
      name: taskName,
      state: state
    })
  }

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

  // add pipe for that
  transformDate(date: string) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: number | string = today.getMonth() + 1; // Months start at 0!
    let dd: number | string = today.getDate();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '-' + mm + '-' + yyyy;
  }
}

