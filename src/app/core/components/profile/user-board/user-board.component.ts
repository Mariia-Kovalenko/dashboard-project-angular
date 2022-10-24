import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/shared/board.model';

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
  constructor() { }

  ngOnInit(): void {
  }

}
