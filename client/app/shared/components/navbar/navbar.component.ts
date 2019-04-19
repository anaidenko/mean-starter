import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from 'client/app/auth/services';
import { RouteService } from 'client/app/core/services';

import { ROUTES } from '../../config/menu-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = true;
  menu = ROUTES;

  constructor(private authService: AuthService, private routeService: RouteService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.routeService.goToLogin(true);
  }
}
