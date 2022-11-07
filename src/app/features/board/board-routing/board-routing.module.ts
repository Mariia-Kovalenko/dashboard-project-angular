import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from '../../auth/auth.guard';
import { BoardDetailsComponent } from '../board-details/board-details.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard/:id', 
    component: BoardDetailsComponent,
    canActivate: [AuthGuard],
},
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
