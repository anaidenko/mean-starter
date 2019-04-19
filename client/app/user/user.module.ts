import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './containers/home/home.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [SettingsComponent, HomeComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule]
})
export class UserModule {}
