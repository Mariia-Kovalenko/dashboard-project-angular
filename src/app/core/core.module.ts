import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/board/board.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { PageTopComponent } from './components/page-top/page-top.component';
import { TaskComponent } from './components/task/task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './components/board-form/board-form.component';


@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    BoardComponent,
    BoardDetailsComponent,
    PageTopComponent,
    TaskComponent,
    BoardFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    DashboardComponent,
    BoardDetailsComponent
  ]
})
export class CoreModule { }
