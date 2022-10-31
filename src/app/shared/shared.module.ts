import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormComponent } from './components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShortenPipe } from './pipes/shorten.pipe';
import { PipesModule } from './pipes/pipes.module';



@NgModule({
  declarations: [
    FormComponent,
    ErrorComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ], 
  exports: [
    FormComponent,
    ErrorComponent,
    LoaderComponent,
    PipesModule
  ]
})
export class SharedModule { }
