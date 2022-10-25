import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { boardsURL, usersURL } from 'src/app/shared/URLs';
import { catchError, Subject, throwError } from 'rxjs';
import { Board } from 'src/app/shared/board.model';

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

  @Output() userUpdated = new Subject<{name: string, email: string}>();
  @Output() error = new Subject<{message: string}>();

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getUserInfo() {
    return this.http.get<{user: {_id: string, name: string, email: string, created_date: string}}>(usersURL + 'me')
    .pipe(catchError(this.handleError))
  }

  getUserBoards() {
    return this.http.get<{boards: Board[]}>(boardsURL + '/my_boards')
  }

  updateUser(name: string, email: string, password: string) {
    const credentials = {name, email, password}
    this.http.patch<{message: string, user: {name: string, email: string}}>(usersURL + 'me', credentials)
    .subscribe({
      next: data => {
        // console.log(data);
        // emit event
        this.userUpdated.next(data.user);
      }, error: err => {
        // console.log(err);
        // process error
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
