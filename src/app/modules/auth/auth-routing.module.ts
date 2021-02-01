import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {DashboardComponent} from '../dashboard/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: SigninComponent, children: [
      {path: 'signin', component: SigninComponent}
    ]
  },
  {path: 'signup', component: SignupComponent},
  {path: 'forgot-password', component: ForgotpasswordComponent},
  {path: 'reset-password', component: ResetpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
