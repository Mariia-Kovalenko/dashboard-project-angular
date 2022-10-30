import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  boardId: string = '';

  @Input() openItemForm!: {
    mode: string, 
    itemType: string, 
    itemToEdit: string, 
    columnForTask?: string};

  @Output() addItem = new EventEmitter();
  @Output() updateItem = new EventEmitter();
  @Output() closeFormModal = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  forbiddenItemNames = /^[0-9\\\.\+\$\-=_]+|[\\\.\+\$\-=_]+$/;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const nameValidators = [Validators.minLength(4), Validators.maxLength(20), this.forbiddenNames.bind(this)];
    const descriptionValidators = [Validators.minLength(4), Validators.maxLength(45)];

    if (this.openItemForm.mode === 'add') {
      nameValidators.push(Validators.required)
      descriptionValidators.push(Validators.required)
    }

    this.form = new FormGroup({
      'name': new FormControl('', nameValidators),
      'description': new FormControl('', descriptionValidators)
    });


    if (this.openItemForm.itemType === 'task') {
      this.route.params  
      .subscribe((params: Params) => {
        this.boardId = params['id'];
        console.log(this.boardId);
        
      })
    }
  }

  forbiddenNames(control: AbstractControl){
    const nameEntered = control.value;
    if (this.forbiddenItemNames.test(nameEntered)) {
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

  onSubmit() {
if (this.form.valid) {
      if (this.openItemForm.mode === 'add') {
        this.addItem.emit({
          boardId: this.boardId, 
          name: this.form.value.name, 
          description: this.form.value.description
        });
      } else if (this.openItemForm.mode === 'edit') {
        this.updateItem.emit({
          boardId: this.boardId, 
          name: this.form.value.name,
          taskDesc: this.form.value.description
        })
      }
      this.form.reset();
    } else {
      console.log('form invalid');
      
    }
  }

}
