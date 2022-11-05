import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from './form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Form Component', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ FormComponent ],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule
            ],
            providers: [
                FormBuilder,
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {params: {id: '24fkzrw3487943uf358lovd'}}
                    }
                }
                
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        component.boardId = '45678ijhbvft6yu78io';
        component.openItemForm = {
            mode: 'add',
            itemToEdit: '56789oiuhg',
            itemType: 'board'
        }
        fixture.detectChanges();
}))

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should require non-empty name and description', () => {
        component.form.setValue({
            "name": "", 
            "description": ""
        });
        expect(component.form.valid).toEqual(false);
    });

    it('should require valid name', () => {
        component.form.setValue({
            "name": "invalid name$", 
            "description": "description"
        });
        expect(component.form.valid).toEqual(false);
    });

    it('should be valid if form value is valid', () => {
        component.form.setValue({
            "name": "Valid Name", 
            "description": "valid description"
        });
    
        expect(component.form.valid).toEqual(true);
    });

    it('should emit addItem on submit for Board', () => {
        const formData = {
            "name": "Valid Name", 
            "description": "valid description"
        }
        const spy = spyOn(component.addItem, 'emit');

        component.form.setValue(formData);    
        expect(component.form.valid).toEqual(true);        
        component.onSubmit();
        expect(spy).toHaveBeenCalledWith({
            boardId: component.boardId, 
            name: formData.name,
            description: formData.description
        });
    })

    it('should emit updateItem on submit for Task', () => {
        const formData = {
            "name": "Valid Name", 
            "description": "valid description"
        }
        component.openItemForm = {
            mode: 'edit',
            itemToEdit: '56789oiuhg',
            itemType: 'task'
        }  
        const spy = spyOn(component.updateItem, 'emit');

        component.form.setValue(formData);  
        expect(component.form.valid).toEqual(true);        
        component.onSubmit();
        expect(spy).toHaveBeenCalledWith({
            boardId: component.boardId, 
            name: formData.name,
            taskDesc: formData.description
        });
    })
})