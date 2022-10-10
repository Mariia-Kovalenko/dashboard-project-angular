import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css']
})
export class PageTopComponent implements OnInit {
  @Input('currentRoute') currentRoute: string = '';

  id!: number;
  filter!: FormGroup;
  filterValue: string = '';
  placeholder: string = 'Enter '

  constructor(private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.currentRoute);
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

    this.filter.valueChanges.subscribe(val => {
      this.filterValue = val.name;
      
      if (this.currentRoute !== 'dashboard') {
        this.boardsService.findTaskByName(this.id, this.filterValue);
      } else {
        this.boardsService.findBoardByName(this.filterValue);
      }
    })
  }

  onFilterBoardsByName(order: string) {
    const res = this.boardsService.filterBoardsByName(order);
  }

  onFilterBoardsByTasks(order: string) {
    const res = this.boardsService.filterBoardsByTasks(order);
  }

  onFilterBoardsByDate(order: string) {
    this.boardsService.filterBoardsByDate(order);
  }

  onSubmit() {
    // console.log(this.filterValue);
    this.boardsService.findBoardByName(this.filterValue);
  }

}
