import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { BoardsService } from '../../services/boards.service';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {
  currentBoard!: Board;
  id: number = 0;
  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(private boardsService: BoardsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params  
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.currentBoard = this.boardsService.getBoard(this.id);
            // console.log(this.currentBoard.tasks);
            this.splitTasksByState();
      })
  }

  splitTasksByState() {
    this.newTasks = this.currentBoard.tasks.filter(task => task.state === State.TODO);
    this.progressTasks = this.currentBoard.tasks.filter(task => task.state === State.IN_PROGRESS);
    this.doneTasks = this.currentBoard.tasks.filter(task => task.state === State.DONE);

    console.log('New tasks:' , this.newTasks);
    console.log('IP tasks:' , this.progressTasks);
    console.log('Done tasks:' , this.doneTasks);
  }

}
