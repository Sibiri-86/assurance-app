import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TypePrimeList } from './model';
import {TypePrimeState} from './state';

const initialState : TypePrimeState = {
  typePrimeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTypePrime, (state, payload: TypePrimeList) => ({
    ...state, typePrimeList: payload.typePrimeDtoList
  }))
);

export function reducer(state: TypePrimeState | undefined, action: Action) {
  return featureReducer(state, action);
}