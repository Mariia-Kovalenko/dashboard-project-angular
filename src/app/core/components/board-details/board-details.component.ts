import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { BoardsService } from '../../services/boards.service';
import { State } from 'src/app/shared/task-state.model';
import { Task } from 'src/app/shared/task.model';
import { Subscription } from 'rxjs';
import { TasksService } from '../../services/tasks.service';
import { FilteringService } from '../../services/filtering.service';
import { LocalStorageService } from '../../services/local-storage.service';

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

  allTasks: Task[] = [];
  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];
  
  draggedItem!: Task;
  showFormModal: boolean = false;
  showTask = false;

  isFetching = true;
  error = false;
  errorMessage = 'Some error occured';

  mode: string = 'add';
  taskToEditId!: string;
  column: string = '';

  taskToOpen: string = '';

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
    private tasksService: TasksService,
    private filteringService: FilteringService,
    private localStorageService: LocalStorageService,
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
              this.isFetching = false;
              this.error = true;
              if (error.error.message) {
                this.errorMessage = error.error.message
              } else if (error.message) {
                this.errorMessage = error.message
              }
            }
          })

          this.getTasksForBoard();
          this.setColumnsInitialBg();
      })
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

    // update task state
    if (taskToUpdate) {
      this.tasksService.updateTask({
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
    this.tasksService.fetchTasksForBoard(this.boardId)
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

  getTasksByName(event: string) {
    this.tasksService.getTasksByName(this.boardId, event)
      .subscribe({
        next: data => {
          this.isFetching = false;
          this.allTasks = data.tasks;
          this.splitTasksByState(this.allTasks);
        }, 
        error: err => {
          console.log(err);
          this.isFetching  = false;
          this.error = true;
          if (err.error.message) {
            this.errorMessage = err.error.message;
          } else if (err.message) {
            this.errorMessage = err.message;
          }
        }
      })
  }

  filterTasks(event: {order: string, criteria: string}) {
    this.filteringService.filterItems(
      event, 
      this.allTasks);
      this.splitTasksByState(this.allTasks)
  }

  setColumnsInitialBg() {
    const toDosBg = this.localStorageService.get('toDosBg')
    const inProgressBg = this.localStorageService.get('inProgressBg')
    const doneBg = this.localStorageService.get('doneBg')
    if (toDosBg) {
      this.applyColorSet(toDosBg, this.toDosColor)
    }
    if (inProgressBg) {
      this.applyColorSet(inProgressBg, this.inProgressColor)
    }
    if (doneBg) {
      this.applyColorSet(doneBg, this.doneColor)
    }
  }

  onChangeBg(event: {color: string, element: string}) {
    switch (event.element) {
      case 'toDos':
        this.applyColorSet(event.color, this.toDosColor);
        this.localStorageService.set('toDosBg', event.color);
        break;
      case 'inProgress':
        this.applyColorSet(event.color, this.inProgressColor);
        this.localStorageService.set('inProgressBg', event.color);
        break;
      case 'done':
        this.applyColorSet(event.color, this.doneColor);
        this.localStorageService.set('doneBg', event.color);
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
    this.showFormModal = true;
    this.column = btn.id;
  }

  onEditTask(event: string) {
    this.taskToEditId = event;
    this.showFormModal = true;
    this.mode = 'edit';
  }

  onDeleteTask(event: string) {
    // console.log('Task to delete:', event);
    this.tasksService.deleteTask(this.boardId, event)
    .subscribe(data => {
      this.getTasksForBoard()
    })
  }

  onArchiveTask(event: string) {
    console.log('task to be archived', event);
    this.tasksService.archiveTask(this.boardId, event)
    .subscribe(data => {
      this.getTasksForBoard()
    })
  }

  onAddNewTask(event: {boardId: string, name: string, description: string}) {
    let state: State = State.TODO;
    switch (this.column) {
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
    
    const {boardId, name, description} = event;

    this.boardsService.addTaskToBoard(boardId, name, description, state)
    .subscribe({
      next: data => {
        this.getTasksForBoard();
      }, error: err => {
        console.log(err);
      }
    });
    this.onCloseForm(true);
  }

  onUpdateTask(event: {boardId: string, name: string, taskDesc: string}) {
    const {boardId, name, taskDesc} = event;
    this.tasksService.updateTask({
      boardId: boardId, 
      taskId: this.taskToEditId, 
      taskName: name,
      taskDesc: taskDesc
    })
      .subscribe(data => {
        console.log(data);
        
        if (data.ok) {
          this.getTasksForBoard();
        }
      })
    this.showFormModal = false;
  }

  onOpenTaskDetails(event: string) {
    console.log(event);
    this.taskToOpen = event;
    // open task details modal
    this.showTask = true;
  }

  onCloseForm(event: boolean) {
    if (event) {
      this.showFormModal = !this.showFormModal;
    } else {
      this.error = true;
    }
  }

  onCloseTaskModal() {
    this.showTask = false;
  }

  onError(event: string) {
    console.log('Error occured: ', event);
    this.error = true;    
  }

  ngOnDestroy() {
    
  }
}
