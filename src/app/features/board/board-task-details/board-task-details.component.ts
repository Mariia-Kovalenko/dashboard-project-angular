import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';
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
    task_to_do: false,
    task_in_progress: false,
    task_done: false
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
          this.setTaskStatusColor(this.task.state);

          this.isLoading = false;
        }, error: err => {
          console.log(err);
          this.error = true;
          if (this.isLoading) {
            this.isLoading = false;
          }
          if (err.error) {
            this.errorMessage = err.error.message
          } else {
            this.errorMessage = err.message
          }
        }
      })
  }

  setTaskStatusColor(status: string) {
    switch (status) {
      case State.TODO:
        this.statusClass.task_to_do = true;
        break;
      case State.IN_PROGRESS:
        this.statusClass.task_in_progress = true;
        break;
      case State.DONE:
        this.statusClass.task_done = true;
        break;
    
      default:
        break;
    }
  }

  onSubmit() {
    console.log('comment');
    if (this.form.valid) {
      this.tasksService.commentTask(this.task._id, this.form.value.message)
        .subscribe({
          next: data => {
            console.log(data);
            this.fetchTask();
          }, error: err => {
            console.log(err);
            
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
        
      }
    })
  }

  onCloseModal() {
    this.closeModal.emit()
  }
}
