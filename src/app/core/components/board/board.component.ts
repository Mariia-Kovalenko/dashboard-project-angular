import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { BoardsService } from '../../services/boards.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input('board') board!: Board;
  @Input() index!: number;
  @Input() mode: string = '';

  @Output() openFormModal = new EventEmitter<{mode:string, index: number}>();

  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private boardService: BoardsService) { }

  ngOnInit(): void {
    this.newTasks = this.board.tasks.filter(task => task.state === State.TODO);
    this.progressTasks = this.board.tasks.filter(task => task.state === State.IN_PROGRESS);
    this.doneTasks = this.board.tasks.filter(task => task.state === State.DONE);
  }

  onOpenBoard() {
    this.openFormModal.emit({mode: this.mode, index: this.index});
  }

}
