import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task!: Task;
  name: string = ''
  id: string = ''

  @Output() editTask = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
    this.name = this.task.name;
    this.id = this.task.id;
  }

  onEditTask() {
    this.editTask.emit(this.id);
  }

}
