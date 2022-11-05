import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/core/services/auth.service';
import {AuthResponseData} from 'src/app/core/services/auth.service';
import {userMock} from '../../../mocks/user-mock';
import { FormsModule } from '@angular/forms';
import {AuthServiceMock} from '../../../mocks/auth.service.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('Auth Component', () => {
    let component: AuthComponent;
    let fixture: ComponentFixture<AuthComponent>;
    let router: Router;
    let authService: AuthService;
    const user = userMock;

    let authServiceStub: Partial<AuthService> = {
        register: () => of({'ok': true, 'name': user.name, message: 'Profile created successfully'}),
        login: () => of({'ok': true, 'name': user.name, 'jwt_token': user.jwt_token})
    }

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [
                AuthComponent
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
                // { provide: AuthService, useValue: authServiceStub }
            ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(AuthComponent);
        authService = TestBed.inject(AuthService);
    
        router = TestBed.inject(Router);
        spyOn(router, 'navigateByUrl');
    
        component = fixture.componentInstance;
        component.isLoginMode = true;
        fixture.detectChanges();
    })

    it('form should be valid', () => {
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const emailInputElement = fixture.debugElement.nativeElement.querySelector('#email');
            const passwordInputElement = fixture.debugElement.nativeElement.querySelector('#password');
            
            emailInputElement.value = 'tomas@email.com';
            passwordInputElement.value = '12345';

            emailInputElement.dispatchEvent(new Event('input'));
            passwordInputElement.dispatchEvent(new Event('input'));

            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(component.ngForm.form.valid).toBeTruthy();
            })
        })
    })

    // it('call login method in login mode on form submit', () => {
    //     fixture.detectChanges();
    //     fixture.whenStable().then(() => {
    //         const emailInputElement = fixture.debugElement.nativeElement.querySelector('#email');
    //         const passwordInputElement = fixture.debugElement.nativeElement.querySelector('#password');
            
    //         emailInputElement.value = 'tomas@email.com';
    //         passwordInputElement.value = '12345';

    //         emailInputElement.dispatchEvent(new Event('input'));
    //         passwordInputElement.dispatchEvent(new Event('input'));

    //         const spy = spyOn(authService, 'login').and.callThrough();

    //         // fixture.detectChanges();
    //         // fixture.whenStable().then(() => {
    //         //     component.onSubmit(component.ngForm);
    //         //     fixture.detectChanges();
    //         //     expect(spy).toHaveBeenCalled();
    //         // })
    //     })
    // })
})