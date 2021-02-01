import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoaderComponent} from '../../shared/components/loader/loader.component';

// Custom components
import {SigninComponent} from './components/signin/signin.component';
import {SignupComponent} from './components/signup/signup.component';
import {ForgotpasswordComponent} from './components/forgotpassword/forgotpassword.component';
import {ResetpasswordComponent} from './components/resetpassword/resetpassword.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';

@NgModule({
  declarations: [SigninComponent, SignupComponent, LoaderComponent, ForgotpasswordComponent, ResetpasswordComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    LoaderComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
})
export class AuthModule {
}
