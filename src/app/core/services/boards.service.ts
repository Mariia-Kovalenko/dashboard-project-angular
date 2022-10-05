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
  taskAdded = new Subject<boolean>();

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
    this.boards[id].name = name;
    this.boards[id].description = desc
    this.boardAdded.next(true);
  }

  addTaskToBoard(id: number, taskName: string, state: State) {
    const newTaskId = Math.floor(Math.random()  * (500 - 105) + 105);  
    this.boards[id].tasks.push(new Task(String(newTaskId), taskName, state, []));
    this.taskAdded.next(true);
  }

  deleteTask(id: number, taskId: string) {
    const taskToDelete = this.boards[id].tasks.findIndex(task => task.id === taskId);
    console.log('Delete task with index ', taskToDelete);
    this.boards[id].tasks.splice(taskToDelete, 1);
    this.taskAdded.next(false);
  }

  updateTask(params: {id: number, taskId: string, taskName?: string, taskState?: State}) {
    const {id, taskId, taskState, taskName} = params;
    const taskIndex = this.boards[id].tasks.findIndex(task => task.id === taskId);

    // console.log(this.boards[id].tasks[taskIndex], taskName); 
    if (taskName) {
      this.boards[id].tasks[taskIndex].name = taskName;
    }
    if (taskState) {
      this.boards[id].tasks[taskIndex].state = taskState;
    }
    this.taskAdded.next(true);
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

