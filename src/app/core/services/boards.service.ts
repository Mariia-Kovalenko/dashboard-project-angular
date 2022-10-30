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

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  // boardsManagened = new Subject<Board[]>();
  // tasksManaged = new Subject<{tasks: Task[], board: string}>();

  boards: Board[]  = [];
  forbiddenBoardNames = /^[0-9\\\.\+\$\-=_]+|[\\\.\+\$\-=_]+$/;

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
          return this.http.get<Boards>(boardsURL + `/${name}` + '/find_boards')
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

  addTaskToBoard(id: string, taskName: string, description: string, state: string) {
    return this.http.post(tasksURL + id, {
      name: taskName,
      description,
      state: state
    })
  }

}

