import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  }
}
