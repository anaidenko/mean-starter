import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'a[href],button[href]'
})
export class DisablePassiveLinkDirective {
  @Input()
  href: string;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (this.isPassiveLink()) {
      event.preventDefault();
    }
  }

  private isPassiveLink() {
    return this.href === '#' || this.href === '';
  }
}
