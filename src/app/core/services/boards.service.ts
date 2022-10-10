import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {
  boardsManagened = new Subject<Board[]>();
  taskManaged = new Subject<boolean>();

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
      '03-09-2022',
      'My board',
      [
        new Task('105', 'My Task 1', State.TODO, []),
        new Task('103', 'My Task 2', State.IN_PROGRESS, []),
        new Task('103', 'Cool Task 3', State.IN_PROGRESS, [])
      ]
    ),
    new Board(
      'My Board 4',
      '06-12-2022',
      'My board',
      [
        new Task('105', 'My Task 1', State.TODO, []),
        new Task('104', 'New Task 2', State.TODO, [])
      ]
    ),
    new Board(
      'New Board 3',
      '07-08-2022',
      'My board',
      [
        new Task('105', 'Task 1', State.TODO, [])
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

  findBoardByName(filterValue: string) {
    if (filterValue) {
      // this.boards = this.boards.filter(board => board.name.toLowerCase().startsWith(filterValue.toLowerCase()));
      this.boardsManagened.next(
        this.boards.filter(board => 
          board.name.toLowerCase().startsWith(filterValue.toLowerCase())
        )
      );
    } else {
      this.boardsManagened.next([...this.boards])
    }
  }

  findTaskByName(boardId: number, taskName: string) {
    // if (taskName) {
    //   this.boardsManagened.next(
    //     [...this.boards.filter((board, i) => {
    //       if (i === boardId) {
    //         board.tasks = board.tasks.filter(task => 
    //           task.name.toLowerCase().startsWith(taskName.toLowerCase())
    //         )
    //       }
    //       return board;
    //     })]
    //   );
    // } else {
    //   this.boardsManagened.next([...this.boards])
    // }
  }

  filterBoardsByName(order: string): Board[] {
    switch (order) {
      case 'ascending':
        // this.boards.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name) ? -1 : 0);
        this.boardsManagened.next(this.boards.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name) ? -1 : 0));
        return [...this.boards]
      case 'descending':
        // this.boards.sort((a, b) => a.name < b.name ? 1 : (a.name > b.name) ? -1 : 0);
        this.boardsManagened.next(this.boards.sort((a, b) => a.name < b.name ? 1 : (a.name > b.name) ? -1 : 0));
        return [...this.boards]
      default:
        return [...this.boards]
    }
  }

  filterBoardsByTasks(order: string): Board[] {
    switch (order) {
      case 'ascending':
        // this.boards.sort((a, b) => a.tasks.length > b.tasks.length ? 1 : (a.tasks.length < b.tasks.length) ? -1 : 0);
        this.boardsManagened.next(this.boards.sort((a, b) => a.tasks.length > b.tasks.length ? 1 : (a.tasks.length < b.tasks.length) ? -1 : 0));
        return [...this.boards]
      case 'descending':
        // this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0);
        this.boardsManagened.next(this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0));
        return [...this.boards]
      default:
        return [...this.boards]
    }
  }

  filterBoardsByDate(order: string) {
    const date = new Date('06-12-2021').getTime();
    const date_2 = new Date('07-08-2021').getTime();

    console.log(date < date_2);
    
    
    switch (order) {
      case 'ascending':
        this.boards.sort((a, b) => {
          const date1 = new Date(a.creationDate).getTime()
          const date2 = new Date(b.creationDate).getTime()
          return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
        });
        this.boardsManagened.next(this.boards.sort((a, b) => {
          const date1 = new Date(a.creationDate).getTime()
          const date2 = new Date(b.creationDate).getTime()
          return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
        }));
        return [...this.boards]
      case 'descending':
        this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0);
        this.boardsManagened.next(this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0));
        return [...this.boards]
      default:
        return [...this.boards]
    }
  }

  addBoard(name: string, desc: string) {
    this.boards.push(
      new Board(name, this.transformDate(String(Date.now())), desc, [])
    )
    this.boardsManagened.next(this.boards);
  }

  updateBoard(id: number, name: string, desc: string) {
    this.boards[id].name = name;
    this.boards[id].description = desc
    this.boardsManagened.next(this.boards);
  }

  addTaskToBoard(id: number, taskName: string, state: State) {
    const newTaskId = Math.floor(Math.random()  * (500 - 105) + 105);  
    this.boards[id].tasks.push(new Task(String(newTaskId), taskName, state, []));
    this.boardsManagened.next(this.boards);
  }

  deleteTask(id: number, taskId: string) {
    const taskToDelete = this.boards[id].tasks.findIndex(task => task.id === taskId);
    console.log('Delete task with index ', taskToDelete);
    this.boards[id].tasks.splice(taskToDelete, 1);
    // this.taskAdded.next(true);
    this.boardsManagened.next(this.boards);
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
    // this.taskAdded.next(true);
    this.boardsManagened.next(this.boards);
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

