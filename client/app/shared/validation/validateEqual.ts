import { Attribute, Directive } from '@angular/core';
import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual]',
  providers: [{ provide: NG_VALIDATORS, useValue: validateEqual, multi: true }]
})
export class ValidateEqualDirective implements Validator {
  constructor(@Attribute('appValidateEqual') private otherControlName: string) {}

  validate(control: AbstractControl) {
    return validateEqual(this.otherControlName)(control);
  }
}

export function validateEqual(otherControlName: string) {
  let thisControl: AbstractControl;
  let otherControl: AbstractControl;

  return (control: AbstractControl) => {
    if (!control.parent) {
      return null;
    }

    // Initializing the validator.
    if (!thisControl) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;
      if (!otherControl) {
        throw new Error('validateEqual(): other control is not found in parent group');
      }
      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return { validateEqual: true };
    }

    return null;
  };
}
