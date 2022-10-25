import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { BoardsService } from '../../services/boards.service';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit, OnDestroy {
  currentBoard: Board = {
    _id: '',
    name: '',
    created_date: '',
    description: ''
  };
  boardId!: string;

  authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQxYWY4MTRiOGMzNGI3MzZlNDdhMmYiLCJpYXQiOjE2NjU1NjQ2MzN9.3DP4x-HQ8QSszsojtqvN1H8jxiosbNkKFh804HBLEuo';

  allTasks: Task[] = [];
  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];
  
  draggedItem!: Task;
  taskToEditId!: string;
  showFormModal: boolean = false;

  isFetching = true;
  error = false;

  formDetails: {
    mode: string,
    column?: string,
    taskToEdit?: string
  } = {
    mode: 'add',
  }
  
  idChangeSub!: Subscription;

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
        this.boardId = params['id'];
        this.boardsService.fetchBoardById(this.boardId)
          .subscribe({
            next: data => {
              this.currentBoard = data.board
              // console.log(this.currentBoard);
            },
            error: error => {
              console.log(error);
              this.error = true;
            }
          })

          this.getTasksForBoard();
      })
      this.idChangeSub = this.boardsService.boardsManagened
      .subscribe(
        (boardManaged: Board[]) => {
          this.showFormModal = false;
        }
      )
  }

  splitTasksByState(tasks: Task[]) {
    this.newTasks = tasks.filter(task => task.state === State.TODO);
    this.progressTasks = tasks.filter(task => task.state === State.IN_PROGRESS);
    this.doneTasks = tasks.filter(task => task.state === State.DONE);
  }

  setDraggedItem(event: Task) {
    this.draggedItem = event;
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
    const taskToUpdate = this.allTasks.find(task => task._id === taskToMove._id);
    // console.log('update ', taskToUpdateIndex);
    
    // update task state
    if (taskToUpdate) {
      this.boardsService.updateTask({
        boardId: this.boardId, 
        taskId: taskToUpdate._id, 
        taskState: newState})
      .subscribe({
        next: data => {
          // console.log('response:', data);
          if (data.ok) {
            this.getTasksForBoard();
          }
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  getTasksForBoard() {
    this.boardsService.fetchTasksForBoard(this.boardId)
          .subscribe({
            next: data => {
              this.allTasks = data.tasks;
              this.splitTasksByState(this.allTasks);
              this.isFetching = false;
            },
            error: error => {
              console.log(error);
              this.error = true;
            }
          })
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

  onOpenTaskAddForm(btn: HTMLButtonElement) {
    // console.log(btn.id);
    this.showFormModal = true;
    this.formDetails = {
      mode: 'add',
      column: btn.id
    }
  }

  onEditTask(event: string) {
    this.taskToEditId = event;
    console.log('Task to edit:', this.taskToEditId);
    // open form in edit mode
    this.showFormModal = true;
    this.formDetails = {
      mode: 'edit',
      taskToEdit: this.taskToEditId
    }
  }

  onDeleteTask(event: string) {
    // console.log('Task to delete:', event);
    this.boardsService.deleteTask(this.boardId, event)
    .subscribe(data => {
      this.getTasksForBoard()
    })
  }

  onArchiveTask(event: string) {
    console.log('task to be archived', event);
    this.boardsService.archiveTask(this.boardId, event)
    .subscribe(data => {
      this.getTasksForBoard()
    })
  }

  onAddNewTask(event: {boardId: string, taskName: string}) {
    let state: State = State.TODO;
    switch (this.formDetails.column) {
      case 'add-todo':
        state = State.TODO;
        break;
      case 'add-in-progress': 
        state = State.IN_PROGRESS
        break;
      case 'add-done':
        state = State.DONE
        break;
    }
    
    const {boardId, taskName} = event;
    this.boardsService.addTaskToBoard(boardId, taskName, state)
    .subscribe(data => {
      this.onCloseForm();
      this.getTasksForBoard();
    })
  }

  onUpdateTask(event: {boardId: string, taskName: string}) {
    const {boardId, taskName} = event;
    this.boardsService.updateTask({
      boardId: boardId, 
      taskId: this.taskToEditId, 
      taskName: taskName})
      .subscribe(data => {
        if (data.ok) {
          this.getTasksForBoard();
        }
      })
    this.showFormModal = false;
  }

  onCloseForm() {
    this.showFormModal = false;
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }
}
