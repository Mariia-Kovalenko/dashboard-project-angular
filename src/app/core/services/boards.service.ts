import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import {boardsURL, tasksURL} from 'src/app/shared/utils/URLs';
import { AuthService } from './auth.service';

interface Boards {
  boards: Board[]
}

interface BoardResponse {
  board: Board
}

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards: Board[]  = [];

  constructor(private http: HttpClient) {
  }

  fetchBoards() {
    return this.http.get<Board[]>(boardsURL)
  }

  fetchBoardById(id: string) {
    return this.http.get<Board>(boardsURL + id)
  }

  findBoardsByName(name: string) {
    if (!name) {
      return this.http.get<Board[]>(boardsURL);
    } else {
      return this.http.get<Board[]>(boardsURL + `/${name}` + '/find_boards')
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

