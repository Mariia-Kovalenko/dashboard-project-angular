import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap} from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import {authURL} from '../../shared/utils/URLs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

export interface AuthResponseData {ok: boolean, message?: string, jwt_token?: string, name: string}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<{jwt_token: string}>({jwt_token: ''});

  constructor(private http: HttpClient, 
    private localStorage: LocalStorageService,
    private router: Router) { }

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
            const token = this.localStorage.get('token');
            if (!token) {
              this.localStorage.set('token', resData.jwt_token);
              this.localStorage.set('user', resData.name);
              this.user.next({jwt_token: resData.jwt_token});
            } else if (token){
              this.user.next({jwt_token: token});
            }
          }
        }));
  }

  autoLogin() {
    const token = this.localStorage.get('token');

    if (!token) {
      return;
    } else {
      this.user.next({jwt_token: token});
    }
  }

  logout() {
    this.localStorage.remove('token');
    this.user.next({jwt_token: ''});
    this.router.navigate(['/auth']);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured';

    if (err.error.message) {
      errorMessage = err.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
