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
  boardId!: string;
  currentBoard!: Board;
  mode!: string;
  @Input() authToken!: string;
  @Input() openTaskForm!: {mode: string, column?: string};
  @Output() addTaskToBoard = new EventEmitter<{boardId: string, taskName: string, description: string}>();
  @Output() updateTask = new EventEmitter<{boardId: string, taskName : string, taskDesc: string}>();
  @Output() closeFormModal = new EventEmitter<string>();

  constructor( private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.openTaskForm);
    this.mode = this.openTaskForm.mode;

    const nameValidators = [Validators.minLength(4)];
    const descriptionValidators = [Validators.maxLength(25)];

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
        this.boardId = params['id'];
        // this.currentBoard = this.boardsService.getBoard(this.boardId);
        // console.log('Current board is ', this.currentBoard.name);
      })
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.mode === 'add') {
        this.addTaskToBoard.emit({
          boardId: this.boardId, 
          taskName: this.form.value.name, 
          description: this.form.value.description
        });
      } else if (this.mode === 'edit') {
        this.updateTask.emit({
          boardId: this.boardId, 
          taskName: this.form.value.name,
          taskDesc: this.form.value.description
        })
      }
      this.form.reset();
    } else {
      console.log('form invalid');
      
    }
  }

  onCloseForm() {
    this.closeFormModal.emit();
  }
}
