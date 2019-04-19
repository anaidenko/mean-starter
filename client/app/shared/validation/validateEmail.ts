import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';
import * as validator from 'validator';

@Directive({
  selector: '[appValidateEmail]',
  providers: [{ provide: NG_VALIDATORS, useValue: validateEmail, multi: true }]
})
export class ValidateEmailDirective {}

export function validateEmail(control: AbstractControl) {
  if (control.value) {
    const isEmail = validator.isEmail(control.value);
    if (!isEmail) {
      return { validateEmail: true };
    }
  }
  return null;
}
