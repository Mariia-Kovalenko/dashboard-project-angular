import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/models/board.model';
import { State } from 'src/app/shared/models/task-state.model';
import { BoardsService } from '../../../core/services/boards.service';
import { Task } from 'src/app/shared/models/task.model';
import { HttpClient } from '@angular/common/http';
import { TasksService } from '../../../core/services/tasks.service';

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
  @Output() tasksNum = new EventEmitter<{bordId: string, tasksNum: number}>();

  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private boardsService: BoardsService,
    private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTasksForBoard(this.board._id);
  }

  getTasksForBoard(id: string) {
    this.tasksService.fetchTasksForBoard(id)
    .subscribe(data => {
      this.tasksNum.emit({bordId: id, tasksNum: data.tasks.length});

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
