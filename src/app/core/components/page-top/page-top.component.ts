import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css']
})
export class PageTopComponent implements OnInit {
  @Input('currentRoute') currentRoute: string = '';
  authToken: string = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQxYWY4MTRiOGMzNGI3MzZlNDdhMmYiLCJpYXQiOjE2NjU1NjQ2MzN9.3DP4x-HQ8QSszsojtqvN1H8jxiosbNkKFh804HBLEuo';

  id!: number;
  filter!: FormGroup;
  filterValue: string = '';
  placeholder: string = 'Enter '

  @Output() findBoards = new EventEmitter<string>()
  @Output() filterBoards = new EventEmitter<{order: string, criteria: string}>()

  constructor(private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params  
      .subscribe((params: Params) => {
        this.id = +params['id'];
      })
    if (this.currentRoute !== 'dashboard') {
      this.placeholder += 'task name'
    } else {
      this.placeholder += 'board name'
    }
    
    this.filter = new FormGroup({
      'name': new FormControl('')
    });

    this.filter.valueChanges
    .pipe(
      debounceTime(250),
      distinctUntilChanged(),
    )
    .subscribe(val => {
      this.filterValue = val.name;
      if (this.currentRoute !== 'dashboard') {
        // this.boardsService.findTaskByName(this.id, this.filterValue);
      } else {
        this.findBoards.emit(this.filterValue);
      }
    })
  }

  onFilterBoardsByName(order: string) {
    this.filterBoards.emit({order: order, criteria: 'name'});
  }

  onFilterBoardsByTasks(order: string) {
    this.filterBoards.emit({order: order, criteria: 'tasks'});
  }

  onFilterBoardsByDate(order: string) {
    this.filterBoards.emit({order: order, criteria: 'date'});
  }

  onSubmit() {
    // console.log(this.filterValue);
    if (!this.authToken) {
      console.log('No token provided');
      return;
    }
    this.findBoards.emit(this.filterValue);
  }

}
