import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {AppState} from '../../../../shared/sessions/app.state';
import {Store} from '@ngrx/store';
import * as UserDetailActions from './../../../../shared/sessions/actions/user.actions';
import {UserDetailModel} from '../../../../models/user-detail.model';
import {AuthService} from '../../../auth/components/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isShowing = false;
  userDetails: UserDetailModel;

  constructor(private dashboardService: DashboardService, private store: Store<AppState>, private authService: AuthService) {
    this.dashboardService.getUserData().subscribe((res) => {
      this.store.dispatch(new UserDetailActions.UserDetailAction(res));
    });
  }

  showNavbar(): void {
    if (this.isShowing) {
      this.isShowing = false;
    } else {
      this.isShowing = true;
    }
  }

  ngOnInit(): void {
    this.store.select('userDetails').subscribe((output) => {
      this.userDetails = output;
    });
  }

}
