import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardModule } from './board/board.module';
import { FormsModule } from '@angular/forms';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { ArchiveModule } from './archive/archive.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../core/services/auth-interceptor.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BoardModule,
    ArchiveModule,
    ProfileModule,
    AuthModule,
    FormsModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
})
export class FeaturesModule { }
