import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { BoardsService } from '../../services/boards.service';
import { Task } from 'src/app/shared/task.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input('board') board!: Board;
  @Input() id!: string;
  @Input() mode: string = '';

  @Output() openFormModal = new EventEmitter<{mode:string, index: string}>();
  @Output() deleteBoard = new EventEmitter<string>();

  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private boardService: BoardsService) { }

  ngOnInit(): void {
    // get tasks for current board

    // if (this.board.tasks) {
    //   this.newTasks = this.board.tasks.filter(task => task.state === State.TODO);
    //   this.progressTasks = this.board.tasks.filter(task => task.state === State.IN_PROGRESS);
    //   this.doneTasks = this.board.tasks.filter(task => task.state === State.DONE);
    // } else {
    // this.boardService.fetchTasksForBoard(this.board._id);
    // }
  }

  onOpenBoard() {
    this.openFormModal.emit({mode: this.mode, index: this.id});
  }

  onDeleteBoard() {
    this.deleteBoard.emit(this.id);
  }

}
