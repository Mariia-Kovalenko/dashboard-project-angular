import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from 'src/app/shared/board.model';
import { Task } from 'src/app/shared/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  boards: Board[] = [];
  tasks: Task[] = [];

  showModal: boolean = false;
  mode: string = 'add';
  boardToUpdate!: string;
  isFetching: boolean = true;
  dataNotFound: boolean = false;
  error = false;

  private boardsSub!: Subscription;
  authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQxYWY4MTRiOGMzNGI3MzZlNDdhMmYiLCJpYXQiOjE2NjU1NjQ2MzN9.3DP4x-HQ8QSszsojtqvN1H8jxiosbNkKFh804HBLEuo';
  // private tasksSub!: Subscription;

  constructor(private boardsService: BoardsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getBoardsFromServer();
    
    this.boardsSub = this.boardsService.boardsManagened
      .subscribe(
        (boardsManaged: Board[]) => {
          // console.log('got boards from servise:', boardsManaged);
          this.showModal = false;
          this.boards = boardsManaged;
        }
    )
  }

  getBoardsFromServer() {
    this.boardsService.fetchBoards()
    .subscribe({
      next: data => {
        if (data.length) {
          this.boards = data;
        } else {
          this.dataNotFound = true;
        }
        this.isFetching = false;
      },
      error: err => {
        console.log(err);
        this.error = true;
      }
    })
  }

  getBoardsByName(event: string) {
    this.isFetching = true;
    this.boardsService.findBoardsByName(event)
      .subscribe({
        next: data => {
          // console.log(data);
          if (data.length) {
            this.boards = data;
            this.dataNotFound = false;
          } else if (!data.length) {
            this.dataNotFound = true;
          }
          this.isFetching = false;
      }, 
      error: error => {
        console.log(error);
        this.error = true;
      }
      });
  }

  onDeleteBoard(event: string) {
    this.boardsService.deleteBoard(event)
    .subscribe({
      next: () => {
        this.getBoardsFromServer();
      }, 
      error: () => {
        this.error = true;
      }
    }
    )
  }

  filterBoards(event: {order: string, criteria: string}) {
    switch (event.criteria) {
      case 'name':
        this.filterBoardsByName(event.order);
        break;
      case 'date':
        this.filterBoardsByDate(event.order);
        break;
      case 'tasks':
        this.filterBoardsByTasks(event.order);
        break;
      default:
        break
    }
  }

  filterBoardsByName(order: string): void {
    switch (order) {
      case 'ascending':
        this.boards = this.boards.sort((a, b) => a.name > b.name ? 1 : (a.name < b.name) ? -1 : 0);
        break;
        case 'descending':
          this.boards = this.boards.sort((a, b) => a.name < b.name ? 1 : (a.name > b.name) ? -1 : 0);
          break;
      default:
        break
    }
  }

  filterBoardsByTasks(order: string): void {
    console.log(this.tasks);
  }

  filterBoardsByDate(order: string): void {
      switch (order) {
      case 'ascending':
        this.boards = this.boards.sort((a, b) => {
          const date1 = new Date(a.created_date).getTime()
          const date2 = new Date(b.created_date).getTime()
          return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
        });
        // this.boardsManagened.next(this.boards.sort((a, b) => {
        //   const date1 = new Date(a.created_date).getTime()
        //   const date2 = new Date(b.created_date).getTime()
        //   return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
        // }));
        break;
      case 'descending':
        this.boards = this.boards.sort((a, b) => {
          const date1 = new Date(a.created_date).getTime()
          const date2 = new Date(b.created_date).getTime()
          return date1 > date2 ? 1 : (date1 < date2) ? -1 : 0
        });
        break
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

  onCloseModal(event: boolean) {
    if (event) {
      this.showModal = !this.showModal;
      this.getBoardsFromServer();
    } else {
      this.error = true;
    }
  }

  onError(event: string) {
    console.log('Error occured: ', event);
    this.error = true;    
  }

  ngOnDestroy() {
    this.boardsSub.unsubscribe();
  }

}
