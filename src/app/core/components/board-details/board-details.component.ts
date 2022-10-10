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
  currentBoard!: Board;
  id: number = 0;
  newTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];
  draggedItem!: Task;
  taskToEditId!: string;
  showFormModal: boolean = false;
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
        this.id = +params['id'];
        this.currentBoard = this.boardsService.getBoard(this.id);
        this.splitTasksByState();
      })
      this.idChangeSub = this.boardsService.boardsManagened
      .subscribe(
        (boardManaged: Board[]) => {
          this.showFormModal = false;
          // console.log('change subscr:', boardManaged);
          // this.currentBoard = taskAdded;
          this.currentBoard = boardManaged[this.id];
          console.log(this.boardsService.boards[this.id]);
          this.splitTasksByState();
        }
      )
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
    const taskToUpdate= this.currentBoard.tasks.find(task => task.id === taskToMove.id);
    // console.log('update ', taskToUpdateIndex);
    
    // update task state
    if (taskToUpdate) {
      // this.currentBoard.tasks[taskToUpdateIndex].state = newState;
      console.log(taskToUpdate.id);
      this.boardsService.updateTask({id: this.id, taskId: taskToUpdate.id, taskState: newState});
      // update task state in service

      // this.splitTasksByState();
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
    console.log('Task to delete:', event);
    this.boardsService.deleteTask(this.id, event);
  }

  onAddNewTask(event: {boardId: number, taskName: string, state: State}) {
    const {boardId, taskName, state} = event;
    this.boardsService.addTaskToBoard(boardId, taskName, state);
    this.showFormModal = false;
  }

  onUpdateTask(event: {boardId: number, taskName?: string, taskDescription?: string}) {
    const {boardId, taskName, taskDescription} = event;
    this.boardsService.updateTask({id: boardId, taskId: this.taskToEditId, taskName});
    this.showFormModal = false;
  }

  onCloseForm(event: string) {
    this.showFormModal = false;
    console.log(event);
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }
}
