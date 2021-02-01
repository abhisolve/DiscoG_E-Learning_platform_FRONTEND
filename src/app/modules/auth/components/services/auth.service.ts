import {HttpClient, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from 'src/environments/environment';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // tslint:disable-next-line:variable-name
  private _accessToken: string = localStorage.getItem('accessToken');
  // tslint:disable-next-line:variable-name
  private _refreshToken: string = localStorage.getItem('refreshToken');


  constructor(private http: HttpClient, public jwtHelper: JwtHelperService, private router: Router) {
  }

  public getAccessToken(): string {
    return this._accessToken;
  }

  public setAccessToken(token: string): void {
    localStorage.setItem('refreshToken', token);
    this._refreshToken = token;
  }

  public logout(): void {
    this.router.navigate(['signin']);
  }

  public getRefreshToken(): string {
    return this._refreshToken;
  }

  public setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
    this._refreshToken = token;
  }

  set refreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
    this._refreshToken = refreshToken;
  }

  public isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  public refreshAccessToken(): Observable<any> {
    return this.http.post<any>(environment.API_PREFIX + 'refresh-token', {
      refresh: this.getRefreshToken()
    });
  }

  public signIn(emailAndPassword: {}): Observable<any> {
    return this.http.post(environment.API_PREFIX + 'generate-token', emailAndPassword);
  }
}
