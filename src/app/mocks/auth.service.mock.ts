import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap} from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { authURL } from '../shared/utils/URLs';
import { Router } from '@angular/router';
import { AuthResponseData } from '../core/services/auth.service';
import { Observable, of } from 'rxjs';
import { userMock } from './user-mock';

@Injectable()
export class AuthServiceMock {
    constructor() {}

    register(name: string, email: string, password: string) {
        return of({'ok': true, 'message': 'Profile created successfully'});
    }

    login(email: string, password: string) {
        return of({'ok': true, 'name': userMock.name, 'jwt_token': userMock.jwt_token})
    }
}



