import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { State } from 'src/app/shared/task-state.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  boardId!: number;
  currentBoard!: Board;
  mode!: string;
  @Input() openTaskForm!: {mode: string, column?: string};
  @Output() addTaskToBoard = new EventEmitter<{boardId: number, taskName: string, state: State}>();
  @Output() updateTask = new EventEmitter<{boardId: number, taskName?: string, taskDescription?: string}>();
  @Output() closeFormModal = new EventEmitter<string>();

  constructor( private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.openTaskForm);
    this.mode = this.openTaskForm.mode;

    const nameValidators = [Validators.minLength(4)];
    const descriptionValidators = [Validators.maxLength(20)];

    if (this.mode === 'add') {
      nameValidators.push(Validators.required)
      descriptionValidators.push(Validators.required)
    }

    this.form = new FormGroup({
      'name': new FormControl('', nameValidators),
      'description': new FormControl('', descriptionValidators)
    });
    
    this.route.params  
      .subscribe((params: Params) => {
        this.boardId = +params['id'];
        this.currentBoard = this.boardsService.getBoard(this.boardId);
        // console.log('Current board is ', this.currentBoard.name);
      })
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.mode === 'add') {
        // console.log('add new task for board', this.boardId);
        let newState!: State;

        switch (this.openTaskForm.column) {
          case 'add-todo':
            newState = State.TODO;
            break;
          case 'add-in-progress':
            newState = State.IN_PROGRESS;
            break;
          case 'add-done':
            newState = State.DONE;
            break;
      }

        this.addTaskToBoard.emit({boardId: this.boardId, taskName: this.form.value.name, state: newState});
      } else if (this.mode === 'edit') {
        // console.log('Update task');
        this.updateTask.emit({boardId: this.boardId, taskName: this.form.value.name, taskDescription: this.form.value.description})
      }
      this.form.reset();
    }
  }

  onCloseForm() {
    this.closeFormModal.emit('closed');
  }
}

// logic:
// 1. get board id from activeRoute
// 2. get column
// 3. get inputs values
// 4. update board tasks array