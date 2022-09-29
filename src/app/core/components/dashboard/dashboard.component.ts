import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';
import { Board } from 'src/app/shared/board.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  boards: Board[] = [];
  showModal: boolean = false;
  form!: FormGroup;

  constructor(private boardsService: BoardsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.boards = this.boardsService.getBoards();
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(4)]),
      'description': new FormControl('', [Validators.required, Validators.maxLength(15)])
    });
    console.log(this.boards);
  }

  onToggleForm() {
    this.showModal = !this.showModal;
  }

  onSubmit() {
    console.log(this.form);
    this.boardsService.addBoard(this.form.value.name, this.form.value.description);
    this.form.reset();
    this.showModal = !this.showModal;
    console.log(this.boardsService.getBoards());
    this.boards = this.boardsService.getBoards();
  }

}
