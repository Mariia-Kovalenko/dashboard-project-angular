import { Component, OnInit } from '@angular/core';
import { UserResponseData, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
