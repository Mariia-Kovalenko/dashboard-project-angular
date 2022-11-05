import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { skip, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated: boolean = false;

  isBurgerOpened: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // console.log('userSub', user);
      this.isAuthenticated = !!user.jwt_token;
    })
  }

  onLogout() {
    this.authService.logout();
    this.onToggleMenu();
  }

  onToggleMenu() {
    if (this.isBurgerOpened) {
      this.isBurgerOpened = false;
    } else {
      this.isBurgerOpened = true;
    }
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
