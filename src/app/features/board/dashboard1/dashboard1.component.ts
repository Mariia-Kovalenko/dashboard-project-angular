import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from '../../../core/services/boards.service';
import { Board } from 'src/app/shared/models/board.model';
import { Task } from 'src/app/shared/models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { FilteringService } from '../../../core/services/filtering.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css'],
  providers: [BoardsService, FilteringService]
})
export class Dashboard1Component implements OnInit {
  boards: Board[] = [];
  tasks: Task[] = [];

  showModal: boolean = false;
  mode: string = 'add';
  boardToUpdate!: string;
  isFetching: boolean = true;
  error = false;
  errorMessage = '';

  numberOfTasksForBoard = new Map();

  constructor(private boardsService: BoardsService,
    private filteringService: FilteringService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBoardsFromServer();
  }

  getBoardsFromServer() {
    this.boardsService.fetchBoards()
    .subscribe({
      next: data => {
        if (data.length) {
          this.boards = data;
        } else {
          this.error = true;
        }
        this.isFetching = false;
      },
      error: err => {
        console.log(err);
        this.isFetching = false;
        let message = err.error.message ? err.error.message: 'Some error occured';
        this.onError(message);
      }
    })
  }

  onGetTasksForBoard(event: {bordId: string, tasksNum: number}) {
    this.numberOfTasksForBoard.set(event.bordId, event.tasksNum);
  }

  getBoardsByName(event: string) {
    this.isFetching = true;
    this.boardsService.findBoardsByName(event)
      .subscribe({
        next: data => {
          if (data.length) {
            this.boards = data;
            this.error = false;
          } else if (!data.length) {
            this.onError('Data not found');
          }
          this.isFetching = false;
      }, 
      error: err => {
        console.log(err);
        this.error = true;
        if (err.error.message) {
          this.errorMessage = err.error.message
        } else if (err.message) {
          this.errorMessage = err.message;
        }
      }
      });
  }

  onDeleteBoard(event: string) {
    this.boardsService.deleteBoard(event)
    .subscribe({
      next: () => {
        this.getBoardsFromServer();
      }, 
      error: (err) => {
        this.error = true;
        if (err.error.message) {
          this.errorMessage = err.error.message
        } else if (err.message) {
          this.errorMessage = err.message;
        }
      }
    }
    )
  }

  filterBoards(event: {order: string, criteria: string}) {
    if (event.criteria === 'tasks') {
      this.filterBoardsByTasks(event.order);
    } else {
      this.filteringService.filterItems(event, this.boards)
    }
    
  }

  filterBoardsByTasks(order: string): void {
    switch (order) {
      case 'ascending':
        this.boards = this.boards.sort((a, b) => this.numberOfTasksForBoard.get(a._id) > this.numberOfTasksForBoard.get(b._id) ? 1 :
          (this.numberOfTasksForBoard.get(a._id) < this.numberOfTasksForBoard.get(b._id)) ? -1 : 0);
        break;
        case 'descending':
          this.boards = this.boards.sort((a, b) => this.numberOfTasksForBoard.get(a._id) < this.numberOfTasksForBoard.get(b._id) ? 1 : 
          (this.numberOfTasksForBoard.get(a._id) > this.numberOfTasksForBoard.get(b._id)) ? -1 : 0);
          break;
      default:
        break
    }
  }

  onOpenAddModal() {
    this.mode = 'add';
    this.showModal = !this.showModal;
  }

  onOpenEditModal(event: {mode:string, index: string}) {
    this.mode = event.mode;
    this.boardToUpdate = event.index;
    this.showModal = !this.showModal;
  }

  onAddBoard(event: {boardId: string, name: string, description: string}) {
    this.boardsService.addBoard(
      event.name, 
      event.description)
        .subscribe({
          next: data => {
            console.log(data);
            this.onCloseModal(true);
          }, 
          error: error => {
            console.log(error);
            let message = error.message || error.error.message || 'Error adding board'
            this.onError(message)
          }
        });
  }

  onUpdateBoard(event: {boardId: string, name: string, description: string}) {
    this.boardsService.updateBoard(
      this.boardToUpdate,
      event.name)
      .subscribe({
        next: data => {
          this.onCloseModal(true);
        }, 
        error: error => {
          console.log(error);
          let message = error.message || error.error.message || 'Error adding board'
          this.onError(message);
        }
      })
  }

  onCloseModal(event: boolean) {
    if (event) {
      this.showModal = !this.showModal;
      this.getBoardsFromServer();
    } else {
      this.error = true;
    }
  }

  onError(event: string) {
    this.error = true;  
    this.errorMessage = event;  
  }

}
