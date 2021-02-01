import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {retry, catchError} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../modules/auth/components/services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private notificationService: NotificationService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if ([401, 403].includes(error.status)) {
        this.authService.logout();
      }

      if (error.error.detail){
        this.notificationService.showNotification(error.error.detail, 'error');
      } else if (error.error.error){
        this.notificationService.showNotification(error.error.error, 'error');
      }
      console.log(error);
      const err = (error && error.error && error.error.message) || error.statusText;
      return throwError(err);
    }));
  }
}

