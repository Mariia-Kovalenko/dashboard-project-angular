import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard1Component } from '../dashboard1/dashboard1.component';
import { AuthGuard } from 'src/app/core/components/auth/auth.guard';

const appRoutes: Routes = [
  {
    path: 'dashboard-1',
    component: Dashboard1Component,
    canActivate: [AuthGuard],
},
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
