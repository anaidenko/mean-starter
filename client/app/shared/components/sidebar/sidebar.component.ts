import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ROUTES } from '../../config/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  menu = ROUTES;

  constructor(private router: Router) {}

  ngOnInit() {}

  isActiveLink(link: string, exact = false) {
    return this.router.isActive(link, exact);
  }
}
