import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {LoaderModel} from '../../models/loader.models';

export const IS_LOADING = 'IS_LOADING';

export class Loading implements Action {
  readonly type = IS_LOADING;

  constructor(public payload: LoaderModel) {
  }
}

export type Actions = Loading;

