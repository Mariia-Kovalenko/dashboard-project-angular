import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from 'src/app/shared/models/task-state.model';
import { Task } from 'src/app/shared/models/task.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { TasksService } from '../../../core/services/tasks.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-board-task-details',
  templateUrl: './board-task-details.component.html',
  styleUrls: ['./board-task-details.component.css']
})
export class BoardTaskDetailsComponent implements OnInit {

  form!: FormGroup;
  @Output() closeModal = new EventEmitter();
  @Input() id!: string;
  currentUser: string = '';

  task: Task = {
    _id: '',
    name: '',
    board_id: '',
    description: '',
    state: State.UNSET,
    created_date: '',
    comments: []
  };

  statusClass = {
    taskToDo: false,
    taskInProgress: false,
    taskDone: false
  }

  isLoading = true;
  error = false;
  errorMessage = 'Something went wrong';

  constructor(private tasksService: TasksService,
    private localStorage: LocalStorageService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'message': new FormControl('', [Validators.maxLength(50)]),
    });

    this.currentUser = this.localStorage.get('user');
    this.fetchTask()
  }

  fetchTask() {
    this.tasksService.getTaskById(this.id)
      .subscribe({
        next: (task: Task) => {
          this.task = task;
          this.setTaskStatusColor(this.task.state);
          this.isLoading = false;
        }, 
        error: err => {
          if (this.isLoading) {
            this.isLoading = false;
          }

          let message = err.error.message || err.message || 'Error fetching task';
          this.onError(message);
        }
      })
  }

  setTaskStatusColor(status: string) {
    switch (status) {
      case State.TODO:
        this.statusClass.taskToDo = true;
        break;
      case State.IN_PROGRESS:
        this.statusClass.taskInProgress = true;
        break;
      case State.DONE:
        this.statusClass.taskDone = true;
        break;
    
      default:
        break;
    }
  }

  onSubmit() {
    // console.log('comment');
    if (this.form.valid) {
      this.tasksService.commentTask(this.task._id, this.form.value.message)
        .subscribe({
          next: data => {
            console.log(data);
            this.fetchTask();
          }, error: err => {
            
            if (this.isLoading) {
              this.isLoading = false;
            }
  
            let message = err.error.message || err.message || 'Error commenting task';
            this.onError(message);
          }
        })

        this.form.reset();
    }
  }

  onDeleteComment(id: string) {
    this.tasksService.deleteComment(this.task._id, id)
    .subscribe({
      next: data => {
        console.log(data);
        this.fetchTask();
      }, error: err => {
        console.log(err);
        
        if (this.isLoading) {
          this.isLoading = false;
        }

        let message = err.error.message || err.message || 'Error deleting task';
        this.onError(message);
      }
    })
  }

  onCloseModal() {
    this.closeModal.emit()
  }

  onError(event: string) {
    this.error = true;  
    this.errorMessage = event;  
  }
}
