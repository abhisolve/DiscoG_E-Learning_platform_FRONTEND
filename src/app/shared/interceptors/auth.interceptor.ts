import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {AuthService} from '../../modules/auth/components/services/auth.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {split} from 'ts-node';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessToken();
    const splitURL = req.url.split('/');
    const endPoint = splitURL[splitURL.length - 1];

    // Check if the Endpoint being called is from a component which doesn't require a Auth Token inserted in the headers
    // If yes, then return the request as is otherwise insert a Auth token
    if (['reset-password', 'send-reset-password-link', 'forgot-password',
      'generate-token', 'refresh-token', 'logout', 'signup'].includes(endPoint)) {
      return next.handle(req);
    } else {
      if (token) {
        req = req.clone({
          setHeaders: {Authorization: `Bearer ${token}`}
        });
      }
      return next.handle(req);
    }
  }

}
