import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Board } from 'src/app/shared/models/board.model';
import { State } from 'src/app/shared/models/task-state.model';
import { Task } from 'src/app/shared/models/task.model';
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

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.getTasksForBoard(this.board._id);
  }

  getTasksForBoard(id: string) {
    this.tasksService.fetchTasksForBoard(id)
    .subscribe(data => {
      this.tasksNum.emit({bordId: id, tasksNum: data.length});

      this.newTasks = data.filter(task => task.state === State.TODO);
      this.progressTasks = data.filter(task => task.state === State.IN_PROGRESS);
      this.doneTasks = data.filter(task => task.state === State.DONE);
      })
    }

  onOpenBoard() {
    this.openFormModal.emit({mode: this.mode, index: this.id});
  }

  onDeleteBoard() {
    this.deleteBoard.emit(this.id);
  }

}
