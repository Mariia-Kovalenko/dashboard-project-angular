import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated: boolean = false;

  isBurgerOpened: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      console.log('userSub', user);
      this.isAuthenticated = !!user.jwt_token;
    })
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleMenu() {
    this.isBurgerOpened = !this.isBurgerOpened;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
