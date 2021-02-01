import {Action} from '@ngrx/store';
import {LoaderModel} from '../../models/loader.models';
import * as LoaderActions from './../actions/loader.actions';


const initialState: LoaderModel = {
  isLoading: false
};

export function loaderReducer(state: LoaderModel = initialState, action: LoaderActions.Actions): {} {
  switch (action.type) {
    case LoaderActions.IS_LOADING:
      return action.payload;
    default:
      return initialState;
  }
}
