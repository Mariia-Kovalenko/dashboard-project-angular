import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {authURL} from '../../shared/URLs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string) {
    return this.http.post<{ok: boolean, message: string}>(authURL + 'register', 
      {
        name,
        email,
        password
      })
  }

  login(email: string, password: string) {
    return this.http.post(authURL + 'login', 
      {
        email,
        password
      })
      // .pipe(catchError( err => {
      //   let errorMessage = 'Unknown error occured';
      //   if (!err.error) {
      //     console.log('no error field');
      //     throw errorMessage;
      //   }
      //   if (err.status === 403) {
      //     return err.error.message + ': wrong credentials'
      //   }
      //   throw errorMessage;
      // }))
  }
}
