import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeBgDirective } from './change-bg.directive';
import { BoardModule } from './board/board.module';


@NgModule({
  declarations: [
    ChangeBgDirective
  ],
  imports: [
    CommonModule,
    BoardModule
  ],
  exports: [
    ChangeBgDirective
  ]
})
export class FeaturesModule { }
