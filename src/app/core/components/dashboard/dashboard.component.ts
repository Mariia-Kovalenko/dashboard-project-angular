import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from 'src/app/shared/board.model';
import { Task } from 'src/app/shared/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


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
    this.boardsService.fetchBoards(this.authToken)
    .subscribe(
        data => {
          this.boards = data;
          this.isFetching = false;
        }, error => {
          console.log(error);
          this.error = true;
        }
    )
  }

  // getTasksForBoards(boards: Board[]) {
  //   boards.forEach(board => {
  //     this.boardsService.fetchTasksForBoard(board._id, this.authToken)
  //       .subscribe(data => {
  //         // console.log(typeof [...data.tasks]);
  //         this.tasks.push(...data.tasks);
  //       })
  //   })
  // }

  // setTasksForBoard(id: string) {
  //   return this.tasks.filter(task => task.board_id === id);
  // }

  onDeleteBoard(event: string) {
    this.boardsService.deleteBoard(event, this.authToken)
    .subscribe(() => {
      this.getBoardsFromServer();
    }, error => {
      this.error = true;
    })
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
