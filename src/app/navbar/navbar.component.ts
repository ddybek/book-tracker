import { AuthService } from '../shared/auth/auth.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isMenuCollapsed = true;

  constructor(private auth: AuthService) {
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.isLoggedIn$();
  }
}
