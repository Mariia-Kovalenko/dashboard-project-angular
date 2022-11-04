import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserResponseData, UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UsersService]
})
export class ProfileComponent implements OnInit, OnDestroy {

  user: UserResponseData = {
    _id: '',
    name: '',
    email: '',
    created_date: ''
  };

  isLoading = true;
  error = false;
  errorMessage = 'Something went wrong';
  userChangedSubscription!: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserInfo()
      .subscribe({
        next: data => {
          this.isLoading = false;
          this.user = data.user;

          if (this.error) {
            this.error = false;
          }
        },
        error: err => {
          if (this.isLoading) {
            this.isLoading = false;
          }

          let message = err.message || err.error.message || 'Error getting data';
          this.onError(message);
        }
      })

    this.userChangedSubscription = this.usersService.userUpdated
      .subscribe({
        next: data => {
          if (this.error) {
            this.error = false;
          }
          const {name, email} = data;
          if (name) {
            this.user.name = name;
          }
          if (email) {
            this.user.email = email;
          }
        }, error: err => {
          let message = err.message || err.error.message || 'Error getting data';
          this.onError(message);
        }
      })
  }

  onError(event: string) {
    this.error = true;  
    this.errorMessage = event;  
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe();
  }
}
