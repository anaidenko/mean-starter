import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ValidateEmailDirective } from './validateEmail';
import { ValidateEqualDirective } from './validateEqual';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ValidateEqualDirective, ValidateEmailDirective],
  declarations: [ValidateEqualDirective, ValidateEmailDirective]
})
export class ValidationModule {}
