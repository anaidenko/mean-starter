import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,

    // features
    AuthModule // uncommented for eager-loading
    // UserModule, // commented out due to lazy-loading
    // AdminModule, // commented out due to lazy-loading
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
