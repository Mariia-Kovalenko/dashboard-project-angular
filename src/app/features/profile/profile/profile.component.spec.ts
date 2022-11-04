import { TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {UsersService} from 'src/app/core/services/users.service';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
        declarations: [
            ProfileComponent
        ],
        imports: [HttpClientTestingModule], 
        providers: [UsersService]
        })
    });

    let component: ProfileComponent

    it('should create the profile', () => {
        const fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be created', () => {
        const usersService: UsersService = TestBed.get(UsersService);
        expect(usersService).toBeTruthy();
    });
});
