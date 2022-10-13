import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Subject, mergeMap } from 'rxjs';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';
import {boardsURL, tasksURL} from 'src/app/shared/URLs';

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

  constructor(private http: HttpClient) {
  }

  fetchBoards(authToken: string) {
    return this.http.get<Boards>(boardsURL,
    {
      headers: new HttpHeaders({'authorization': authToken})
    })
      .pipe(map(responseData => {
        const boards = responseData.boards.map(board => {
          const {_id, name, description, created_date, created_by} = board;
          const date = this.transformDate(created_date);

          return {_id, name, description, created_date: date, created_by}
        });
        return boards
      }))
  }

  fetchBoardById(id: string, authToken: string) {
    return this.http.get<{board: Board}>(boardsURL + id, 
    {
      headers: new HttpHeaders({'authorization': authToken})
    })
  }

  fetchTasksForBoard(id: string, authToken: string) {
    return this.http.get<Tasks>(tasksURL + id,
    {
      headers: new HttpHeaders({'authorization': authToken})
    })
  }

  findBoardsByName(name: string, authToken: string) {
    return this.http.get<{boards: Board[]}>(boardsURL + 'find_name' + `/${name}`,
    {
      headers: new HttpHeaders({'authorization': authToken})
    }
    ).pipe(map(responseData => {
      const boards = responseData.boards.map(board => {
        const {_id, name, description, created_date, created_by} = board;
        const date = this.transformDate(created_date);

        return {_id, name, description, created_date: date, created_by}
      });
      return boards
    }))
  }

  findTaskByName(boardId: number, taskName: string) {
    // this.http.get()
  }


  addBoard(name: string, desc: string, authToken: string) {
    return this.http.post(boardsURL, 
      {
        name: name,
        description: desc
      },
      {
        headers: new HttpHeaders({'authorization': authToken})
      }
    )
  }

  updateBoard(id: string, name: string, authToken: string) {
    return this.http.put(boardsURL + id, 
      {
        name: name
      },
      {
        headers: new HttpHeaders({'authorization': authToken})
      }
    )
  }

  deleteBoard(id: string, authToken: string) {
    return this.http.delete(boardsURL + id, 
      {
        headers: new HttpHeaders({'authorization': authToken})
      })
  }

  addTaskToBoard(id: string, taskName: string, state: string, authToken: string) {
    return this.http.post(tasksURL + id, {
      name: taskName,
      state: state
    },
    {
      headers: new HttpHeaders({'authorization': authToken})
    })
  }

  deleteTask(boardId: string, taskId: string, authToken: string) {
    return this.http.delete(`${tasksURL}${boardId}/${taskId}`,
    {
      headers: new HttpHeaders({'authorization': authToken})
    })
  }

  updateTask(params: {
    boardId: string, 
    taskId: string, 
    taskName?: string, 
    taskState?: State},
    authToken: string) {
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
    queryParams,
    {
      headers: new HttpHeaders({'authorization': authToken})
    })
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

