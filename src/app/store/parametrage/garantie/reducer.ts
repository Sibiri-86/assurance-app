import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { GarantieList } from './model';
import {GarantieState} from './state';

const initialState : GarantieState = {
  garantieList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setGarantie, (state, payload: GarantieList) => ({
    ...state, garantieList: payload.typeGarantieDtoList
  }))
);

export function reducer(state: GarantieState | undefined, action: Action) {
  return featureReducer(state, action);
}