import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnDestroy {
  isSpinnerVisible = true;

  private sub: Subscription;

  @Output()
  start = new EventEmitter<void>();

  @Output()
  stop = new EventEmitter<void>();

  constructor(private router: Router) {
    this.sub = this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
          this.start.emit();
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isSpinnerVisible = false;
          this.stop.emit();
        }
      },
      () => {
        this.isSpinnerVisible = false;
        this.stop.emit();
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
