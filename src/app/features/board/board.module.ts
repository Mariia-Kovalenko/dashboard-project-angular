import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { RouterModule } from '@angular/router';
import { BoardRoutingModule } from './board-routing/board-routing.module';
import { PageTopModule } from '../page-top/page-top.module';
import { BoardComponent } from './board/board.component';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    Dashboard1Component,
    BoardComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BoardRoutingModule,
    PageTopModule,
    ReactiveFormsModule,
  ], 
  exports: [
    Dashboard1Component
  ]
})
export class BoardModule { }
