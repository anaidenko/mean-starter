import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { from } from 'rxjs';

import { RouteService } from './route.service';

@Injectable({ providedIn: 'root' })
export class LandingPageResolver implements Resolve<boolean> {
  constructor(private routeService: RouteService) {}

  resolve() {
    return from(this.routeService.goToLandingPage());
  }
}
