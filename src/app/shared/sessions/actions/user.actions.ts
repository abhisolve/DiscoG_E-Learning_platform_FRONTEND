import {Action} from '@ngrx/store';
import {UserDetailModel} from '../../../models/user-detail.model';


export const ADD_USER_DETAIL = 'ADD_USER_DETAIL';

export class UserDetailAction implements Action {
  readonly type = ADD_USER_DETAIL;

  constructor(public payload: UserDetailModel) {
  }
}

export type Actions = UserDetailAction;
