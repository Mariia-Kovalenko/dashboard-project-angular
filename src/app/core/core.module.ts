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
// import { BoardFormComponent } from './components/board-form/board-form.component';
import { DraggableDirective } from './draggable/draggable.directive';
import { DragAreaDirective } from './draggable/drag-area.directive';
import { ChangeBgDirective } from '../features/change-bg.directive';
import { FeaturesModule } from '../features/features.module';
// import { TaskFormComponent } from './components/task-form/task-form.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ErrorComponent } from '../shared/components/error/error.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/profile/profile-tabs/edit-profile/edit-profile.component';
import { UserBoardsComponent } from './components/profile/profile-tabs/user-boards/user-boards.component';
import { UserProfileComponent } from './components/profile/profile-tabs/user-profile/user-profile.component';
import { UserBoardComponent } from './components/profile/user-board/user-board.component';
import { ArchivedTasksComponent } from './components/archived-tasks/archived-tasks.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { FormComponent } from '../shared/components/form/form.component';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    BoardComponent,
    BoardDetailsComponent,
    PageTopComponent,
    TaskComponent,
    // DraggableDirective,
    // DragAreaDirective,
    AuthComponent,
    // LoaderComponent,
    // ErrorComponent,
    // FormComponent,
    // ShortenPipe,
    ProfileComponent,
    EditProfileComponent,
    UserBoardsComponent,
    UserProfileComponent,
    UserBoardComponent,
    ArchivedTasksComponent,
    TaskDetailsComponent
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
    BoardDetailsComponent,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})
export class CoreModule { }
