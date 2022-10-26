import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserResponseData, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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
  errorSubscription!: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserInfo()
      .subscribe({
        next: data => {
          this.isLoading = false;
          this.user = data.user
          console.log(this.user);
        },
        error: err => {
          console.log(err);
          this.error = true;
          this.errorMessage = err.message;
        }
      })

    this.userChangedSubscription = this.usersService.userUpdated
    .subscribe(data => {
      // console.log('Data from subscription', data);
      if (this.error) {
        this.error = false
      }
      const {name, email} = data;
      if (name) {
        this.user.name = name
      }
      if (email) {
        this.user.email = email
      }
    })

    this.errorSubscription = this.usersService.error.subscribe(err => {
      this.errorMessage = err.message;
      this.error = true;
    })
  }

  ngOnDestroy() {
    this.userChangedSubscription.unsubscribe()
    this.errorSubscription.unsubscribe();
  }
}
