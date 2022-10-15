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

    if (this.isLoginMode) {
      this.authService.login(email, password)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      })
    } else {
      this.authService.register(name, email, password)
      .subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
          
        }
      })
    }
    

    form.reset();
  }

}
