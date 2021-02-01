import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RouteGuard as RouteGuard} from './shared/guards/route.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [RouteGuard],
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module')
        .then((m) => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
