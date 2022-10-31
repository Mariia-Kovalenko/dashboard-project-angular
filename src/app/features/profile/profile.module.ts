import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { UserBoardComponent } from './user-board/user-board.component';
import { EditProfileComponent } from './profile-tabs/edit-profile/edit-profile.component';
import { UserBoardsComponent } from './profile-tabs/user-boards/user-boards.component';
import { UserProfileComponent } from './profile-tabs/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing/profile-routing.module';



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
