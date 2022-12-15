import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from '../auth/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserBoardsComponent } from './components/user-boards/user-boards.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
        {
            path: 'info',
            component: UserProfileComponent
        },
        {
            path: 'user-boards',
            component: UserBoardsComponent
        },
        {
            path: 'edit/:id',
            component: EditProfileComponent
        }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
