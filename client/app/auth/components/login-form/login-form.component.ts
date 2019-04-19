import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateEmail } from 'client/app/shared/validation';

import { LoginMetadata } from '../../models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input()
  disabled: boolean;

  @Output()
  ngSubmit = new EventEmitter<LoginMetadata>();

  form: FormGroup;
  formValidated: boolean;

  get email() { return this.form.get('email'); } // prettier-ignore
  get password() { return this.form.get('password'); } // prettier-ignore

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, validateEmail]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.formValidated = true;
    if (this.form.invalid) {
      return;
    }
    const metadata = this.toMetadata();
    this.ngSubmit.emit(metadata);
  }

  toMetadata(): LoginMetadata {
    return {
      email: this.email.value,
      password: this.password.value
    };
  }
}
