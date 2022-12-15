import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from 'src/app/shared/models/task.model';

@Component({
  selector: 'app-board-task',
  templateUrl: './board-task.component.html',
  styleUrls: ['./board-task.component.css']
})
export class BoardTaskComponent implements OnInit {
  @Input() task!: Task;

  @Output() taskAction = new EventEmitter<{action: string, taskId: string}>();
  @Output() moveTask = new EventEmitter<{task: Task, column: string}>()

  constructor() { }

  ngOnInit(): void {
  }

  onEditTask() {
    this.taskAction.emit({action: 'edit', taskId: this.task._id});
  }

  onDeleteTask() {
    this.taskAction.emit({action: 'delete', taskId: this.task._id});
  }

  onArchiveTask() {
    this.taskAction.emit({action: 'archive', taskId: this.task._id});
  }

  onOpenTaskDetails() {
    this.taskAction.emit({action: 'details', taskId: this.task._id})
  }

  onMoveTask(column: string) {
    this.moveTask.emit({task: this.task, column});
  }

}
