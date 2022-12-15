import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserBoardComponent } from './components/user-board/user-board.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserBoardsComponent } from './components/user-boards/user-boards.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [
    ProfileComponent,
    UserBoardComponent,
    EditProfileComponent,
    UserBoardsComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
