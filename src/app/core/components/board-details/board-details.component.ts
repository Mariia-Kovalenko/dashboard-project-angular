import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  draggedItem!: Task;

  // classes
  toDosColor = {
    blue: false,
    purple: false,
    white: true
  }
  inProgressColor = {
    blue: false,
    purple: false,
    white: true
  }
  doneColor = {
    blue: false,
    purple: false,
    white: true
  }

  constructor(private boardsService: BoardsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params  
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.currentBoard = this.boardsService.getBoard(this.id);
            this.splitTasksByState();
      })
  }

  splitTasksByState() {
    this.newTasks = this.currentBoard.tasks.filter(task => task.state === State.TODO);
    this.progressTasks = this.currentBoard.tasks.filter(task => task.state === State.IN_PROGRESS);
    this.doneTasks = this.currentBoard.tasks.filter(task => task.state === State.DONE);
  }

  onItemDropped(event: string) {
    const taskToMove = this.draggedItem;
    let newState!: State;

    switch (event) {
      case 'toDo':
        newState = State.TODO;
        break;
      case 'inProgress':
        newState = State.IN_PROGRESS;
        break;
      case 'done':
        newState = State.DONE;
        break;
      default: 
        newState = this.draggedItem.state;
    }
    // move task to column
    const taskToUpdateIndex = this.currentBoard.tasks.findIndex(task => task.id === taskToMove.id);
    console.log('update ', taskToUpdateIndex);
    
    // update task state
    if (taskToUpdateIndex >= 0) {
      this.currentBoard.tasks[taskToUpdateIndex].state = newState;
      this.splitTasksByState();
    }
  }

  setDraggedItem(event: Task) {
    this.draggedItem = event;
  }

  onChangeBg(event: {color: string, element: string}) {
    // console.log(`Color for ${event.element} must be changed to ${event.color}`);

    switch (event.element) {
      case 'toDos':
        this.applyColorSet(event.color, this.toDosColor)
        break;
      case 'inProgress':
        this.applyColorSet(event.color, this.inProgressColor)
        break;
      case 'done':
        this.applyColorSet(event.color, this.doneColor)
        break;
      default:
        break;
    }
  }

  applyColorSet(colorToSet: string, 
    classesObj: {
      blue: boolean,
      purple: boolean,
      white: boolean
    }) {
    const newColorSet = Object.fromEntries(Object.entries(this.toDosColor).map(color => {
      if (color[0] === colorToSet) {
        color[1] = true
      } else {
        color[1] = false;
      }
      return color;
    }));
    classesObj.blue = newColorSet['blue'];
    classesObj.purple = newColorSet['purple'];
    classesObj.white = newColorSet['white'];
  }
}
