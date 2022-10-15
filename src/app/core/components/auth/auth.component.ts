import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) { }

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

    if (this.isLoginMode) {
      this.authService.login(email, password)
      .subscribe({
        next: data => {
          console.log(data);
          this.isLoading = false;
          if (!this.error) {
            this.error = false;
          }
        },
        error: err => {
          this.error = true;
          this.isLoading = false;
          if (err.status === 403) {
            this.errorMessage = err.error.message + ': wrong credentials'
          }
        }
      })
    } else {
      this.authService.register(name, email, password)
      .subscribe({
        next: data => {
          console.log(data);
          this.isLoading = false;

          if (!this.error) {
            this.error = false;
          }
          this.onSwitchMode();
        },
        error: err => {
          console.log(err);
          this.error = true;
          this.isLoading = false;
          if (err.status === 400) {
            this.errorMessage = err.error;
          }
        }
      })
    }
    form.reset();
  }

}
