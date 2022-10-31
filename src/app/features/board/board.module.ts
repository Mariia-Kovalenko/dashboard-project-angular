import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BoardRoutingModule } from './board-routing/board-routing.module';
import { PageTopModule } from '../page-top/page-top.module';
import { BoardComponent } from './board/board.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { BoardTaskComponent } from './board-task/board-task.component';
import { ChangeBgDirective } from './directives/change-bg.directive';
import { DragAreaDirective } from './directives/drag-area.directive';
import { DraggableDirective } from './directives/draggable.directive';
import { BoardTaskDetailsComponent } from './board-task-details/board-task-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    Dashboard1Component,
    BoardComponent,
    // FormComponent,
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
    SharedModule
  ], 
  exports: [
    Dashboard1Component
  ]
})
export class BoardModule { }
