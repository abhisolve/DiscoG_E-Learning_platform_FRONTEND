import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) {
  }

  sendRecoverPasswordEmailLink(email: {}): Observable<any> {
    return this.http.post(environment.API_PREFIX + 'send-reset-password-link', email);
  }

}
