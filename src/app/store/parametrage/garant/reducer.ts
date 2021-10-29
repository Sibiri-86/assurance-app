import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { GarantList } from './model';
import {TypeGarantState} from './state';

const initialState : TypeGarantState = {
  garantList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setGarant, (state, payload: GarantList) => ({
    ...state, garantList: payload.typeGarantDtoList
  }))
);

export function reducer(state: TypeGarantState | undefined, action: Action) {
  return featureReducer(state, action);
}