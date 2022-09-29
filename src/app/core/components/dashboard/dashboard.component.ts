import { Component, OnDestroy, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from 'src/app/shared/board.model';
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
  showModal: boolean = false;
  mode: string = 'add';
  boardToUpdate!: number;
  private idChangeSub!: Subscription;
  // form!: FormGroup;

  constructor(private boardsService: BoardsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.boards = this.boardsService.getBoards();
    this.idChangeSub = this.boardsService.boardAdded
      .subscribe(
        (boardAdded: boolean) => {
          this.showModal = !boardAdded;
          this.boards = this.boardsService.getBoards();
        }
      )
    // this.form = new FormGroup({
    //   'name': new FormControl('', [Validators.required, Validators.minLength(4)]),
    //   'description': new FormControl('', [Validators.required, Validators.maxLength(15)])
    // });
    console.log(this.boards);
  }

  onOpenAddModal() {
    this.mode = 'add';
    this.showModal = !this.showModal;
  }

  onOpenEditModal(event: {mode:string, index: number}) {
    this.mode = event.mode;
    this.boardToUpdate = event.index;
    this.showModal = !this.showModal;
  }

  onCloseModal(event: string) {
    // console.log(event);
    this.showModal = !this.showModal;
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }

  // onSubmit() {
  //   console.log(this.form);
  //   if (this.form.valid) {
  //     this.boardsService.addBoard(this.form.value.name, this.form.value.description);
  //     this.form.reset();
  //     this.showModal = !this.showModal;
  //     console.log(this.boardsService.getBoards());
  //     this.boards = this.boardsService.getBoards();
  //   }
  // }

}
