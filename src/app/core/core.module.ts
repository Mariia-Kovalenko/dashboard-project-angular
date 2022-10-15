import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/board/board.component';
import { BoardDetailsComponent } from './components/board-details/board-details.component';
import { AppRoutingModule } from '../app-routing.module';
import { PageTopComponent } from './components/page-top/page-top.component';
import { TaskComponent } from './components/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DragAreaDirective } from './draggable/drag-area.directive';
import { ChangeBgDirective } from '../features/change-bg.directive';
import { FeaturesModule } from '../features/features.module';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ErrorComponent } from '../shared/components/error/error.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    BoardComponent,
    BoardDetailsComponent,
    PageTopComponent,
    TaskComponent,
    BoardFormComponent,
    DraggableDirective,
    DragAreaDirective,
    TaskFormComponent,
    AuthComponent,
    LoaderComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FeaturesModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    DashboardComponent,
    BoardDetailsComponent
  ]
})
export class CoreModule { }
