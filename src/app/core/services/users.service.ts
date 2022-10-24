import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { boardsURL, usersURL } from 'src/app/shared/URLs';
import { catchError, throwError } from 'rxjs';
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

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  getUserInfo() {
    return this.http.get<{user: {_id: string, name: string, email: string, created_date: string}}>(usersURL + '/me')
    .pipe(catchError(this.handleError))
  }

  getUserBoards() {
    return this.http.get<{boards: Board[]}>(boardsURL + '/my_boards')
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = 'Unknown error occured';

    if (err.error.message) {
      errorMessage = err.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
