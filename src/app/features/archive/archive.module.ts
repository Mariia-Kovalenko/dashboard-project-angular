import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { ArchiveRoutingModule } from './archive-routing.module';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { ErrorComponent } from 'src/app/shared/components/error/error.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ArchivedTasksComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ArchiveRoutingModule,
    SharedModule
  ], 
  exports: [
    ArchivedTasksComponent
  ]
})
export class ArchiveModule { }
