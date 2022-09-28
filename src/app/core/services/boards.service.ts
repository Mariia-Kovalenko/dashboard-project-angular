import { Injectable } from '@angular/core';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boards: Board[] = [
    new Board(
      'Board 1',
      '2022-09-09',
      'My board',
      [
        new Task('My Task', State.TODO, []),
        new Task('My Task 2', State.DONE, []),
        new Task('My Task 3', State.IN_PROGRESS, []),
        new Task('My Task 4', State.TODO, [])
      ]
    ),
    new Board(
      'Board 2',
      '2022-09-09',
      'My board',
      [
        new Task('My Task 2', State.TODO, [])
      ]
    )
  ];

  constructor() { }

  getBoards() {
    return [...this.boards];
  }

  getBoard(id: number) {
    return this.boards[id];
  }
}
