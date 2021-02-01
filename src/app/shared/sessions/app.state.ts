import {LoaderModel} from '../models/loader.models';
import {UserDetailModel} from '../../models/user-detail.model';

export interface AppState{
  readonly isLoading: LoaderModel;
  readonly userDetails: UserDetailModel;
}
