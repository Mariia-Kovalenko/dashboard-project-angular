import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Input() authToken: string = '';

  @Output() openFormModal = new EventEmitter<{mode:string, index: string}>();
  @Output() deleteBoard = new EventEmitter<string>();

  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.getTasksForBoard(this.board._id);
  }

  getTasksForBoard(id: string) {
    this.boardsService.fetchTasksForBoard(id)
    .subscribe(data => {
      this.newTasks = data.tasks.filter(task => task.state === State.TODO);
      this.progressTasks = data.tasks.filter(task => task.state === State.IN_PROGRESS);
      this.doneTasks = data.tasks.filter(task => task.state === State.DONE);
      })
    }

  onOpenBoard() {
    this.openFormModal.emit({mode: this.mode, index: this.id});
  }

  onDeleteBoard() {
    this.deleteBoard.emit(this.id);
  }

}
