import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/task.model';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  form!: FormGroup;
  @Output() closeModal = new EventEmitter();
  @Input() id!: string;

  task!: Task;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'message': new FormControl('', [Validators.maxLength(50)]),
    });

    this.tasksService.getTaskById(this.id)
      .subscribe({
        next: data => {

          const {
            board_id,
            _id,
            comments,
            description,
            created_date,
            name,
            state
          } = data.task;

          this.task = new Task(_id, board_id, name, description, state, created_date, comments);

          console.log(this.task);
          
        }, error: err => {
          console.log(err);
          
        }
      })
  }

  onSubmit() {
    console.log('comment');
  }

  onCloseModal() {
    this.closeModal.emit()
  }

}
