import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTopComponent } from './page-top/page-top.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PageTopComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PageTopComponent
  ]
})
export class PageTopModule { }
