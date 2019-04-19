import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateEqual } from 'client/app/shared/validation';

import { SignupMetadata } from '../../models';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Input()
  disabled: boolean;

  @Output()
  ngSubmit = new EventEmitter<SignupMetadata>();

  form: FormGroup;
  formValidated = false;

  get firstname() { return this.form.get('firstname'); } // prettier-ignore
  get lastname() { return this.form.get('lastname'); } // prettier-ignore
  get email() { return this.form.get('email'); } // prettier-ignore
  get password() { return this.form.get('password'); } // prettier-ignore
  get confirmPassword() { return this.form.get('confirmPassword'); } // prettier-ignore
  get confirmTerms() { return this.form.get('confirmTerms'); } // prettier-ignore

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, validateEqual('password')]],
      confirmTerms: [null, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    this.formValidated = true;
    if (this.form.invalid) {
      return;
    }
    const metadata = this.getMetadata();
    this.ngSubmit.emit(metadata);
  }

  getMetadata(): SignupMetadata {
    return {
      firstName: this.firstname.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value
    };
  }
}
