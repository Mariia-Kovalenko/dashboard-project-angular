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

  // filterBoardsByTasks(order: string): Board[] {
  //   switch (order) {
  //     case 'ascending':
  //       // this.boards.sort((a, b) => a.tasks.length > b.tasks.length ? 1 : (a.tasks.length < b.tasks.length) ? -1 : 0);
  //       this.boardsManagened.next(this.boards.sort((a, b) => a.tasks.length > b.tasks.length ? 1 : (a.tasks.length < b.tasks.length) ? -1 : 0));
  //       return [...this.boards]
  //     case 'descending':
  //       // this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0);
  //       this.boardsManagened.next(this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0));
  //       return [...this.boards]
  //     default:
  //       return [...this.boards]
  //   }
  // }

  // filterBoardsByDate(order: string) {
  //   const date = new Date('06-12-2021').getTime();
  //   const date_2 = new Date('07-08-2021').getTime();

  //   console.log(date < date_2);
    
    
  //   switch (order) {
  //     case 'ascending':
  //       this.boards.sort((a, b) => {
  //         const date1 = new Date(a.created_date).getTime()
  //         const date2 = new Date(b.created_date).getTime()
  //         return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
  //       });
  //       this.boardsManagened.next(this.boards.sort((a, b) => {
  //         const date1 = new Date(a.created_date).getTime()
  //         const date2 = new Date(b.created_date).getTime()
  //         return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
  //       }));
  //       return [...this.boards]
  //     case 'descending':
  //       this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0);
  //       this.boardsManagened.next(this.boards.sort((a, b) => a.tasks.length < b.tasks.length ? 1 : (a.tasks.length > b.tasks.length) ? -1 : 0));
  //       return [...this.boards]
  //     default:
  //       return [...this.boards]
  //   }
  // }

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
    // this.boardsManagened.next(this.boards);
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

  // addTaskToBoard(id: number, taskName: string, state: State) {
  //   const newTaskId = Math.floor(Math.random()  * (500 - 105) + 105);  
  //   this.boards[id].tasks.push(new Task(String(newTaskId), taskName, state, []));
  //   this.boardsManagened.next(this.boards);
  // }

  // deleteTask(id: number, taskId: string) {
  //   const taskToDelete = this.boards[id].tasks.findIndex(task => task.id === taskId);
  //   console.log('Delete task with index ', taskToDelete);
  //   this.boards[id].tasks.splice(taskToDelete, 1);
  //   // this.taskAdded.next(true);
  //   this.boardsManagened.next(this.boards);
  // }

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

