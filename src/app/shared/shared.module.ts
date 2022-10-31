import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormComponent,
    ErrorComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], 
  exports: [
    FormComponent,
    ErrorComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
