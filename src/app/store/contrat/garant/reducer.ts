import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { GarantList } from './model';
import {GarantState} from './state';

const initialState : GarantState = {
  garantList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setGarant, (state, payload: GarantList) => ({
    ...state, garantList: payload.garantDtoList
  }))
);

export function reducer(state: GarantState | undefined, action: Action) {
  return featureReducer(state, action);
}