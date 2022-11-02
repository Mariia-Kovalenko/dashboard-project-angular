import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserResponseData, UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user: UserResponseData = {
    _id: '',
    name: '',
    email: '',
    created_date: ''
  };

  isLoading = true;
  error = false;
  errorMessage = 'Error';
  showConfirm = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserInfo()
      .subscribe({
        next: data => {
          this.isLoading = false;
          this.user = data.user
          
          if (this.error) {
            this.error = false;
          }
        },
        error: err => {
          console.log(err);
          this.error = true;
          if (this.isLoading) {
            this.isLoading = false;
          }
          
          if (err.message) {
            this.errorMessage = err.message;
          } else if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      })
  }

  onOpenConfirm() {
    this.showConfirm = true;
  }

  onDeleteProfile() {
    console.log('delete user');
    this.usersService.deleteUser();
  }

  onCancel() {
    this.showConfirm = false;
  }

}
