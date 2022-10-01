import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boardAdded = new Subject<boolean>();

  boards: Board[] = [
    new Board(
      'Board 1',
      this.transformDate(String(Date.now())),
      'My board',
      [
        new Task('101', 'My Task', State.TODO, []),
        new Task('102', 'My Task 2', State.DONE, []),
        new Task('103', 'My Task 3', State.IN_PROGRESS, []),
        new Task('104', 'My Task 4', State.TODO, [])
      ]
    ),
    new Board(
      'Board 2',
      this.transformDate(String(Date.now())),
      'My board',
      [
        new Task('105', 'My Task 2', State.TODO, [])
      ]
    ),
  ];

  constructor() { }

  getBoards() {
    return [...this.boards];
  }

  getBoard(id: number) {
    return this.boards[id];
  }

  addBoard(name: string, desc: string) {
    this.boards.push(
      new Board(name, this.transformDate(String(Date.now())), desc, [])
    )
    this.boardAdded.next(true);
  }

  updateBoard(id: number, name: string, desc: string) {
    this.boards[id] =
      new Board(name, this.transformDate(String(Date.now())), desc, [])
    this.boardAdded.next(true);
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

