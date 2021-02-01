import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from 'src/app/shared/services/notification.service';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../shared/sessions/app.state';
import {Router} from '@angular/router';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})

export class SigninComponent implements OnInit {
  // Set return URL in case the user was redirected to signin page from another page such as Dashboard
  // This can occur in case a user's Access Token or Refresh Token gets expired
  returnUrl: any = false;

  constructor(private notificationService: NotificationService, private authService: AuthService,
              private store: Store<AppState>, private router: Router) {
    // set the value of returnURL if 'returnURL' exists in URL's queryParams
    // else set it to false
    this.returnUrl = this.router.parseUrl(this.router.url).queryParams.returnUrl || false;
  }


  // Create a signin form that has 2 fields email and password
  // Validators act as conditions that need to be satisfied for the form to be 'valid'
  signInForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      [Validators.required, Validators.email]
    ),
    password: new FormControl('', [Validators.required]),
  });

  // Signin the user once Signin button is pressed on the template
  public signinUser(emailAndPassword): void {
    // Check if signin form is valid, i.e. all the validators are satisfied
    if (this.signInForm.valid) {
      // Make a call to the backend to see if the credentials supplied in the form are valid
      // To get the data that came from the backend we need to subscribe to the response
      // Any errors that occur in any XHR call will be handled by the http.error.interceptor.ts
      this.authService.signIn(emailAndPassword).subscribe((res) => {
        // Set access and refresh token in localstorage
        localStorage.setItem('accessToken', res.access);
        localStorage.setItem('refreshToken', res.refresh);
        // Pop a notification that indicates that  the signin was successfull.
        this.notificationService.showNotification('You have been logged in successfully! You will be redirected soon', 'success');
        // In case there happens to be a returnURL redirect to that, otherwise redirect to Dashboard
        if (this.returnUrl === false) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigateByUrl(this.returnUrl);
        }
      });
    } else {
      // If  the form is invalid we check what Validator wasn't satisfied and construct and error message accordingly
      let errorString = '';
      if (this.signInForm.controls.email.errors.required) {
        errorString += 'A proper email address is required ';
      }
      if (this.signInForm.controls.password.errors.required) {
        errorString += 'Password is required';
      }
      // Show the error string that was prepared
      this.notificationService.showNotification(errorString, 'error');
    }
  }

  ngOnInit()
    :
    void {
  }
}
