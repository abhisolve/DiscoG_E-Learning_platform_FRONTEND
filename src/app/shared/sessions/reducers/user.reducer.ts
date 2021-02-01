import {UserDetailModel} from '../../../models/user-detail.model';
import * as UserDetailAction from './../actions/user.actions';


const initialState: UserDetailModel = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  phone_number: 0,
  profile_photo: '',
  is_active: false,
  is_superuser: false,
  is_admin: false,
  is_staff: false,
  is_teacher: false,
  parent: {
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    parent_id: '',
  }
};

export function userDetailReducer(state: UserDetailModel = initialState, action: UserDetailAction.Actions): UserDetailModel{
  switch (action.type){
    case UserDetailAction.ADD_USER_DETAIL:
      return action.payload;
    default:
      return initialState;
  }
}

