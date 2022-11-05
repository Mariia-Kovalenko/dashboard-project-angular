import { Component, Input, OnInit } from '@angular/core';
import { BoardsService } from 'src/app/core/services/boards.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { Board } from 'src/app/shared/models/board.model';

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.css']
})
export class UserBoardComponent implements OnInit {

  @Input() board: Board = {
    _id: '',
    name: '',
    description: '',
    created_date: ''
  };

  tasksNum: number = 0;
  constructor(private boardsService: BoardsService,
    private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.fetchTasksForBoard(this.board._id)
      .subscribe({
        next: data => {
          console.log(data);
          this.tasksNum = data.length
        },
        error: err => {
          console.log(err);
        }
      })
  }
}
