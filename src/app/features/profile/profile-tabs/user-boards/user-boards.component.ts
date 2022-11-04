import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { Board } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-user-boards',
  templateUrl: './user-boards.component.html',
  styleUrls: ['./user-boards.component.css'],
  providers: [UsersService]
})
export class UserBoardsComponent implements OnInit {
  boards: Board[] = [];

  isLoading = true;
  error = false;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserBoards()
      .subscribe({
        next: data => {
          this.boards = data.boards
          this.isLoading = false;
        },
        error: err => {
          this.isLoading = false;
          this.error = true;
        }
      })
  }

}
