import { Component, OnInit } from '@angular/core';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.css']
})
export class ArchivedTasksComponent implements OnInit {

  tasks: {_id: string, comments: string[], created_date: string, name: string}[] = [];

  isLoading = true;
  error = false;
  noData = false;
  errorMessage: string = 'Some error occured';
  constructor(private boardsService: BoardsService) { }

  ngOnInit(): void {
    this.boardsService.getArchivedTasks()
      .subscribe({
        next: data => {
          this.tasks = data;
          if (this.error) {
            this.error = false;
          }
          this.isLoading = false;
        }, 
        error: err => {
          console.log(err);
          if (this.isLoading) {
            this.isLoading = false;
          }
          this.error = true;
          this.errorMessage = err.message;
        }
      })
  }

}
