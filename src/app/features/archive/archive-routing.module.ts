import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
const appRoutes: Routes = [
  {
    path: 'archived',  
    component: ArchivedTasksComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class ArchiveRoutingModule { }
