import { Component, OnInit } from '@angular/core';
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
        }
      })
  }

}
