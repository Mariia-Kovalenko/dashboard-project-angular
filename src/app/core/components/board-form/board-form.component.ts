import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {
  form!: FormGroup;
  @Input() mode!: string;
  @Input() boardToUpdate!: string;
  @Output() closeFormModal = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();
  
  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
    const nameValidators = [Validators.minLength(4), Validators.maxLength(20), this.forbiddenNames.bind(this)];
    const descriptionValidators = [Validators.minLength(4), Validators.maxLength(45)];

    if (this.mode === 'add') {
      nameValidators.push(Validators.required)
      descriptionValidators.push(Validators.required)
    }

    this.form = new FormGroup({
      'name': new FormControl('', nameValidators),
      'description': new FormControl('', descriptionValidators)
    });
  }

  onSubmit() {
    console.log(this.form);
    
    if (this.form.valid) {
      if (this.mode === 'add') {
        this.boardsService.addBoard(
          this.form.value.name, 
          this.form.value.description)
            .subscribe({
              next: data => {
                console.log(data);
                this.onCloseForm();
              }, 
              error: error => {
                console.log(error);
                this.onError(error.message)
              }
            });
      } else if (this.mode === 'edit') {
        this.boardsService.updateBoard(
          this.boardToUpdate,
          this.form.value.name)
          .subscribe({
            next: data => {
              this.onCloseForm();
            }, 
            error: error => {
              console.log(error);
              this.onError(error.message)
            }
          })
      }
      this.form.reset();
    }
  }

  forbiddenNames(control: AbstractControl){
    const nameEntered = control.value;
    if (this.boardsService.forbiddenBoardNames.test(nameEntered)) {
      return {'nameForbidden': true}
    }
    return null;
  }

  onCloseForm() {
    this.closeFormModal.emit(true);
  }

  onError(message: string) {
    this.error.emit(message);
  }

}
