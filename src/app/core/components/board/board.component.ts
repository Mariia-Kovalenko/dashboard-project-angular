import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/shared/board.model';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input('board') board!: Board;
  @Input() index!: number;
  @Input() mode: string = '';

  @Output() openFormModal = new EventEmitter<{mode:string, index: number}>();

  constructor(private boardService: BoardsService) { }

  ngOnInit(): void {
  }

  onOpenBoard() {
    this.openFormModal.emit({mode: this.mode, index: this.index});
  }

}
