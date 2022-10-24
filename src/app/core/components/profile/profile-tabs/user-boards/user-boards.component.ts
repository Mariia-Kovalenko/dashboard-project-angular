import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Board } from 'src/app/shared/board.model';

@Component({
  selector: 'app-user-boards',
  templateUrl: './user-boards.component.html',
  styleUrls: ['./user-boards.component.css']
})
export class UserBoardsComponent implements OnInit {
  boards: Board[] = [];

  isLoading = true;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserBoards()
      .subscribe({
        next: data => {
          console.log(data);
          this.boards = data.boards
          this.isLoading = false;
        },
        error: err => {
          console.log(err);
        }
      })
  }

}
