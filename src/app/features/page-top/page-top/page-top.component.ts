import { ThisReceiver } from '@angular/compiler';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BoardsService } from '../../../core/services/boards.service';

@Component({
  selector: 'app-page-top',
  templateUrl: './page-top.component.html',
  styleUrls: ['./page-top.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTopComponent implements OnInit{
  @Input('currentRoute') currentRoute: string = '';

  id!: number;
  filter!: FormGroup;
  filterValue: string = '';
  placeholder: string = 'Enter '

  showFilter = true;
  forbiddenFilterValues = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s]/;
  isInvalidInput = false;

  @Output() findItems = new EventEmitter<string>()
  @Output() filterItems = new EventEmitter<{order: string, criteria: string}>();

  constructor(private boardsService: BoardsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params  
      .subscribe((params: Params) => {
        this.id = +params['id'];
      })

    if (this.currentRoute !== 'dashboard') {
      this.placeholder += 'task name';
      this.showFilter = false;
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
    .subscribe({
      next: val => {
        if (this.forbiddenFilterValues.test(val.name)) {
          this.isInvalidInput = true;
        } else {
          this.filterValue = val.name;
          this.findItems.emit(this.filterValue);
          this.isInvalidInput = false;
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  onFilterItemsByName(order: string) {
    if (this.filter.value.name) {
      this.filter.reset();
    }
    this.filterItems.emit({order: order, criteria: 'name'});
  }

  onFilterBoardsByTasks(order: string) {
    if (this.filter.value.name) {
      this.filter.reset();
    }
    this.filterItems.emit({order: order, criteria: 'tasks'});
  }

  onFilterItemsByDate(order: string) {
    if (this.filter.value.name) {
      this.filter.reset();
    }
    this.filterItems.emit({order: order, criteria: 'date'});
  }
}
