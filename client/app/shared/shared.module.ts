import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { BodyComponent } from './containers/body/body.component';
import { DisablePassiveLinkDirective } from './directives/disable-passive-link.directive';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

@NgModule({
  declarations: [
    BlankLayoutComponent,
    BasicLayoutComponent,
    NotFoundComponent,
    SpinnerComponent,
    DisablePassiveLinkDirective,
    NavbarComponent,
    BodyComponent,
    SidebarComponent
  ],
  imports: [CommonModule, RouterModule, NgbModule, NgxWebstorageModule, FormsModule, ReactiveFormsModule],
  exports: [RouterModule, NgbModule, NgxWebstorageModule, FormsModule, ReactiveFormsModule, SpinnerComponent, DisablePassiveLinkDirective]
})
export class SharedModule {}
