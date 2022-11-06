import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { boardsURL, usersURL } from 'src/app/shared/utils/URLs';
import { BehaviorSubject, catchError, Subject, take, throwError } from 'rxjs';
import { Board } from 'src/app/shared/models/board.model';
import { LocalStorageService } from './local-storage.service';

export interface UserResponseData {
  _id: string,
  name: string,
  email: string,
  created_date: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  @Output() userUpdated = new BehaviorSubject<{name: string, email: string}>({name: '', email: ''});
  @Output() error = new Subject<{message: string}>();

  constructor(private http: HttpClient,
    private localStorage: LocalStorageService,
    private authService: AuthService) { }

  getUserInfo() {
    return this.http.get<{_id: string, name: string, email: string, created_date: string}>(usersURL + 'me')
    .pipe(catchError(this.handleError))
  }

  getUserName(id: string) {
    return this.http.get<{user: {_id: string, name: string}}>(usersURL + id)
    .pipe(
      take(1),
      catchError(this.handleError))
  }

  getUserBoards() {
    return this.http.get<Board[]>(boardsURL + '/my_boards')
    .pipe(
      take(1),
      catchError(this.handleError))
  }

  updateUser(name: string, email: string, password: string) {
    const credentials = {name, email, password}
    this.http.patch<{message: string, user: {name: string, email: string}}>(usersURL + 'me', credentials)
    .pipe(
      take(1)
    )
    .subscribe({
      next: data => {
        console.log(data);
        
        this.userUpdated.next(data.user);
        // update user in local storage
        this.localStorage.set('user', data.user.name);
      }, 
      error: err => {
        if (err.error.message) {
          this.error.next({message: err.error.message});
        } else if (err.message) {
          this.error.next({message: err.message});
        }
      }
    })
  }

  deleteUser() {
    this.http.delete(usersURL + 'me')
    .pipe(
      take(1),
      catchError(this.handleError)
      )
      .subscribe({
        next: () => {
          this.localStorage.remove('user')
          this.authService.logout()
        }, error: err => {
          this.error.next({message: err.error.message});
        }
      })
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured';

    if (err.error.message) {
      errorMessage = err.error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}
