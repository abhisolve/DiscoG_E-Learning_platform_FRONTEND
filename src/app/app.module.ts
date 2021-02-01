import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './modules/auth/auth.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import {StoreModule} from '@ngrx/store';
import {loaderReducer} from './shared/sessions/reducers/loader.reducers';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderService} from './shared/components/loader/services/loader.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoaderInterceptor} from './shared/interceptors/loader.interceptor';
import {HttpErrorInterceptor} from './shared/interceptors/http.error.interceptor';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';
import {userDetailReducer} from './shared/sessions/reducers/user.reducer';
import {appInitializer} from './shared/initializers/app.initializer';
import {AuthService} from './modules/auth/components/services/auth.service';

export function tokenGetter(): string {
  return localStorage.getItem('access-token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Custom models
    AuthModule,
    DashboardModule,

    // 3rd party helper modules used by the entire application
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 6000,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['http://localhost:4200']
      }
    }),
    StoreModule.forRoot({
      loader: loaderReducer,
      userDetails: userDetailReducer
    }),
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService]},
    LoaderService,
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
