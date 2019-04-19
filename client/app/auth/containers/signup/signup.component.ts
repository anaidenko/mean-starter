import { Component, OnInit } from '@angular/core';
import { RouteService } from 'client/app/core/services';

import { SignupMetadata } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  submitting: boolean;
  error: string;

  constructor(private authService: AuthService, private routeService: RouteService) {}

  ngOnInit() {}

  onSubmit(metadata: SignupMetadata) {
    this.error = null;
    this.submitting = true;
    this.authService.signup(metadata).subscribe(
      response => {
        this.submitting = false;
        this.authService.setToken(response.token);
        this.authService.refresh(response.user);
        this.routeService.goToLandingPage();
      },
      error => {
        console.log(error);
        this.submitting = false;
        this.error = (error.error && error.error.message) || error.message || 'An unexpected error occurred.';
      }
    );
  }
}
