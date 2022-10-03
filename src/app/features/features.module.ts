import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeBgDirective } from './change-bg.directive';



@NgModule({
  declarations: [
    ChangeBgDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChangeBgDirective
  ]
})
export class FeaturesModule { }
