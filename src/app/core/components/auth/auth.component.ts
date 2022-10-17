import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.register(name, email, password)
    }

    authObs.subscribe({
      next: data => {
        console.log(data);
        this.isLoading = false;
        if (this.error) {
          this.error = false;
        }
        if (this.isLoginMode) {
          this.router.navigate(['/dashboard']);
        } else {
          this.onSwitchMode();
        }
      },
      error: err => {
        console.log(err);
        
        this.error = true;
        this.isLoading = false;
        this.errorMessage = err;
      }
    })

    form.reset();
  }

}
