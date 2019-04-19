import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './auth/auth.module';
import { AuthGuardService, AuthResolver } from './auth/services';
import { LandingPageResolver } from './core/services';
import { NotFoundComponent } from './shared/errors/not-found/not-found.component';
import { BasicLayoutComponent } from './shared/layouts/basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './shared/layouts/blank-layout/blank-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlankLayoutComponent,
    resolve: {
      landing: LandingPageResolver
    }
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => AuthModule // eager-loaded
      }
    ]
  },
  {
    path: '',
    component: BasicLayoutComponent,
    resolve: {
      me: AuthResolver
    },
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren: './user/user.module#UserModule' // lazy-loaded
      },
      {
        path: '',
        loadChildren: './admin/admin.module#AdminModule' // lazy-loaded
      }
    ]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
