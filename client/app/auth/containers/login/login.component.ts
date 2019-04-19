import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteService } from 'client/app/core/services';
import { Subscription } from 'rxjs';

import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { LoginMetadata } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(LoginFormComponent)
  login: LoginFormComponent;

  submitting: boolean;
  error: string;

  private sub: Subscription;

  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewInit() {
    this.sub = this.login.form.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  onSubmit(metadata: LoginMetadata) {
    this.error = null;
    this.submitting = true;
    this.authService.login(metadata).subscribe(
      response => {
        this.submitting = false;
        this.authService.setToken(response.token);
        this.authService.refresh(response.user);
        this.redirect();
      },
      error => {
        console.log(error);
        this.submitting = false;
        this.error = (error.error && error.error.message) || error.message || 'An unexpected error occurred.';
      }
    );
  }

  private redirect() {
    const redirect = this.route.snapshot.queryParamMap.get('redirect');
    if (redirect) {
      this.router.navigateByUrl(redirect);
    } else {
      this.routeService.goToLandingPage();
    }
  }
}
