import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Board } from 'src/app/shared/models/board.model';
import { BoardsService } from '../../../core/services/boards.service';
import { State } from 'src/app/shared/models/task-state.model';
import { Task } from 'src/app/shared/models/task.model';
import { TasksService } from '../../../core/services/tasks.service';
import { FilteringService } from '../../../core/services/filtering.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css']
})
export class BoardDetailsComponent implements OnInit {
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
              this.currentBoard = data;
              // console.log(this.currentBoard);
            },
            error: err => {
              console.log(err);
              this.isFetching = false;

              let message = err.message || err.error.message || 'Error fetching tasks';
              this.onError(message);
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

  onMoveTask(event: {task: Task, column: string}) {
    this.draggedItem = event.task;

    this.onItemDropped(event.column);
  }

  onItemDropped(event: string) {
    const taskToMove = this.draggedItem;
    // do nothing if task is about to be dropped to the same column
    if (taskToMove.state === event) {
      return;
    }
    // remove task from old array in component
    this.removeTaskFromOldColumn(taskToMove);

    // change task state and move to new column in component
    const taskToUpdate = this.addTaskToNewColumn(event, taskToMove);

    // update task state on server
    if (taskToUpdate) {
      this.tasksService.updateTask({
        boardId: this.boardId, 
        taskId: taskToUpdate._id, 
        taskState: taskToUpdate.state})
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: err => {
          console.log(err);
          this.getTasksForBoard();
        }
      })
    }
  }

  removeTaskFromOldColumn(taskToMove: Task) {
    switch (taskToMove.state) {
      case 'toDo':
        this.newTasks = this.newTasks.filter(task => task._id !== taskToMove._id);
        break;
      case 'inProgress':
        this.progressTasks = this.progressTasks.filter(task => task._id !== taskToMove._id);
        break;
      case 'done':
        this.doneTasks = this.doneTasks.filter(task => task._id !== taskToMove._id);
        break;
      default: 
        break;
    }
  }

  addTaskToNewColumn(column: string, taskToMove: Task) {
    let newState!: State;
    switch (column) {
      case 'toDo':
        newState = State.TODO;
        taskToMove.state = newState;
        this.newTasks.push(taskToMove);
        return taskToMove;
      case 'inProgress':
        newState = State.IN_PROGRESS;
        taskToMove.state = newState;
        this.progressTasks.push(taskToMove);
        return taskToMove;
      case 'done':
        newState = State.DONE;
        taskToMove.state = newState;
        this.doneTasks.push(taskToMove);
        return taskToMove;
      default: 
        newState = this.draggedItem.state;
        return taskToMove;
    }
  }

  getTasksForBoard() {
    this.tasksService.fetchTasksForBoard(this.boardId)
      .subscribe({
        next: data => {
          this.allTasks = data;
          this.splitTasksByState(this.allTasks);
          this.isFetching = false;
        },
        error: err => {
          let message = err.message || err.error.message || 'Error fetching tasks';
          this.onError(message);
        }
      })
  }

  getTasksByName(event: string) {
    this.tasksService.getTasksByName(this.boardId, event)
      .subscribe({
        next: data => {
          this.isFetching = false;
          this.allTasks = data;
          this.splitTasksByState(this.allTasks);
        }, 
        error: err => {
          // console.log(err);
          this.isFetching  = false;
          let message = err.message || err.error.message || 'Error fetching tasks';
          this.onError(message);
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
    this.mode = 'add';
  }

  onEditTask(event: string) {
    this.taskToEditId = event;
    this.showFormModal = true;
    this.mode = 'edit';
  }

  onDeleteTask(event: string) {
    this.tasksService.deleteTask(this.boardId, event)
    .subscribe({
      next: () => {
        this.getTasksForBoard()
      },
      error: err => {
        let message = err.error.message || 'Error deleting tasks';
        this.onError(message);
      }
    })
  }

  onArchiveTask(event: string) {
    this.tasksService.archiveTask(this.boardId, event)
    .subscribe({
      next: () => {
        this.getTasksForBoard()
      },
      error: err => {
        let message = err.error.message || 'Error archiving tasks';
        this.onError(message);
      }
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
        let message = err.error.message || 'Error adding task';
        this.onError(message)
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
      .subscribe({
        next: data => {
          if (data.ok) {
            this.getTasksForBoard();
          }
        }, error: err => {
          let message = err.error.message || 'Error archiving tasks';
          this.onError(message);
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
    this.error = true;  
    this.errorMessage = event;  
  }
}
