import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {LoaderModel} from './shared/models/loader.models';
import {AppState} from './shared/sessions/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'discog-frontend';
  loaderModule: Observable<LoaderModel>;
  isLoading: boolean;

  constructor(private router: Router, private store: Store<AppState>) {
  }
}
