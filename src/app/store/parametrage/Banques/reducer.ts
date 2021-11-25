import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { BanqueList } from './model';
import {BanqueState} from './state';

const initialState : BanqueState = {
  banqueList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setBanque, (state, payload: BanqueList) => ({
    ...state, banqueList: payload.banqueDtoList
  }))
);

export function reducer(state: BanqueState | undefined, action: Action) {
  return featureReducer(state, action);
}