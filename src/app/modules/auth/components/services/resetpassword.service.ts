import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private  http: HttpClient) {
  }

  resetUserPassword(hashAndPassword): Observable<any> {
    const data = {'password-hash': hashAndPassword.hash, password: hashAndPassword.newPassword};
    return this.http.post(environment.API_PREFIX + 'reset-password', data);
  }
}
