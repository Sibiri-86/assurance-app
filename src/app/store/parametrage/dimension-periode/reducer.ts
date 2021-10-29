import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { DimensionPeriodeList } from './model';
import {DimensionPeriodeState} from './state';

const initialState : DimensionPeriodeState = {
  dimensionPeriodeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setDimensionPeriode, (state, payload: DimensionPeriodeList) => ({
    ...state, dimensionPeriodeList: payload.typeDimensionPeriodeDtoList
  }))
);

export function reducer(state: DimensionPeriodeState | undefined, action: Action) {
  return featureReducer(state, action);
}