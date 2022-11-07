import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardRoutingModule } from './board-routing/board-routing.module';
import { PageTopModule } from '../page-top/page-top.module';
import { BoardComponent } from './board/board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { BoardTaskComponent } from './board-task/board-task.component';
import { ChangeBgDirective } from './directives/change-bg.directive';
import { DragAreaDirective } from './directives/drag-area.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { BoardTaskDetailsComponent } from './board-task-details/board-task-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShortenPipe } from 'src/app/shared/pipes/shorten.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    BoardDetailsComponent,
    BoardTaskComponent,
    ChangeBgDirective,
    DragAreaDirective,
    DraggableDirective,
    BoardTaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BoardRoutingModule,
    PageTopModule,
    ReactiveFormsModule,
    SharedModule,
  ], 
  exports: [
    DashboardComponent
  ]
})
export class BoardModule { }
