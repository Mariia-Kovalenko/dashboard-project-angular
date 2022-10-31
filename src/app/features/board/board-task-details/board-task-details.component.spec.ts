import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskDetailsComponent } from './board-task-details.component';

describe('BoardTaskDetailsComponent', () => {
  let component: BoardTaskDetailsComponent;
  let fixture: ComponentFixture<BoardTaskDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardTaskDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
