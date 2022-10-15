import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap} from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import {authURL} from '../../shared/URLs';
import { LocalStorageService } from './local-storage.service';

export interface AuthResponseData {ok: boolean, message: string, jwt_token?: string}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken = new Subject<{jwt_token: string}>();

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(authURL + 'register', 
      {
        name,
        email,
        password
      }).pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(authURL + 'login', 
      {
        email,
        password
      })
      .pipe(catchError(this.handleError), 
        tap(resData => {
          if (resData.jwt_token) {
            if (!this.localStorage.get('token')) {
              this.localStorage.set('token', resData.jwt_token);
              this.userToken.next({jwt_token: resData.jwt_token});
            } else {
              console.log('token already stored');
            }
          }
        }));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured';

    if (err.error.message) {
      errorMessage = err.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
