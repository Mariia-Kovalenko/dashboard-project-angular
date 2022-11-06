import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditProfileComponent } from './edit-profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from 'src/app/core/services/users.service';


describe('Edit Profile Component', () => {
    let component: EditProfileComponent;
    let fixture: ComponentFixture<EditProfileComponent>;
    let router: Router;
    let usersService: UsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ EditProfileComponent ],
            imports: [
                ReactiveFormsModule,
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                UsersService,
                FormBuilder,
                
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(EditProfileComponent);
        usersService = TestBed.inject(UsersService);
        router = TestBed.inject(Router);
        component = fixture.componentInstance;
        component.userId = '3456789oijhbvfrty678';
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should require valid name length (min: 4, max: 20)', () => {
        component.form.setValue({
            "name": "Tom", 
            "email": "",
            "password": ""
        });
        expect(component.form.valid).toEqual(false);
    });

    it('should require valid email address', () => {
        component.form.setValue({
            "name": "Tom", 
            "email": "invalid-email",
            "password": ""
        });
        expect(component.form.valid).toEqual(false);
    });

    describe('user service calls', () => {
        beforeEach(() => {
            fixture.detectChanges();
        })

        it('should call #updateUser service request on form submit for valid input', () => {
            const spy = spyOn(usersService, 'updateUser').and.callThrough();
            component.form.setValue({
                "name": "Tomas", 
                "email": "tomas@email.com",
                "password": ""
            });
    
            expect(component.form.valid).toEqual(true);
            component.onSubmit();
            expect(spy).toHaveBeenCalledWith('Tomas', 'tomas@email.com', '');
        })
    })

})