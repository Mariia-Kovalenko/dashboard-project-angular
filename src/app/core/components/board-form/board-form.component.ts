import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BoardsService } from '../../services/boards.service';
import { Subject } from 'rxjs';
import { Board } from 'src/app/shared/board.model';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.css']
})
export class BoardFormComponent implements OnInit {
  form!: FormGroup;
  @Input() mode!: string;
  @Input() boardToUpdate!: number;
  @Output() closeFormModal = new EventEmitter<string>();
  
  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
    const nameValidators = [Validators.minLength(4)];
    const descriptionValidators = [Validators.maxLength(15)];

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
    if (this.form.valid) {
      if (this.mode === 'add') {
        this.boardsService.addBoard(this.form.value.name, this.form.value.description);
      } else if (this.mode === 'edit') {
        this.boardsService.updateBoard(this.boardToUpdate, 
          this.form.value.name ? this.form.value.name : this.boardsService.boards[this.boardToUpdate].name, 
          this.form.value.description ? this.form.value.description : this.boardsService.boards[this.boardToUpdate].description);
      }
      this.form.reset();
    }
  }

  onCloseForm() {
    this.closeFormModal.emit('closed');
  }

}
