import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeBgDirective } from './change-bg.directive';
import { BoardModule } from './board/board.module';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { ArchiveModule } from './archive/archive.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [
    ShortenPipe,
    ChangeBgDirective
  ],
  imports: [
    CommonModule,
    BoardModule,
    ArchiveModule,
    ProfileModule,
    AuthModule,
    FormsModule,
  ],
  exports: [
  ]
})
export class FeaturesModule { }
