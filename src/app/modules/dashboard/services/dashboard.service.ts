import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDetailModel} from '../../../models/user-detail.model';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getUserData(): Observable<UserDetailModel>{
    return this.http.get<UserDetailModel>(environment.API_PREFIX + 'user-details/');
  }
}
