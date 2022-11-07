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

  @Output() editTask = new EventEmitter<string>()
  @Output() deleteTask = new EventEmitter<string>()
  @Output() archiveTask = new EventEmitter<string>()
  @Output() openTaskDetails = new EventEmitter<string>()
  @Output() moveTask = new EventEmitter<{task: Task, column: string}>()

  constructor() { }

  ngOnInit(): void {
  }

  onEditTask() {
    this.editTask.emit(this.task._id);
  }

  onDeleteTask() {
    this.deleteTask.emit(this.task._id);
  }

  onArchiveTask() {
    this.archiveTask.emit(this.task._id);
  }

  onOpenTaskDetails() {
    this.openTaskDetails.emit(this.task._id)
  }

  onMoveTask(column: string) {
    this.moveTask.emit({task: this.task, column});
  }

}
