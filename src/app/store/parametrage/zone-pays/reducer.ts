import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ZonePaysList } from './model';
import {ZonePaysState} from './state';

const initialState : ZonePaysState = {
  zonePaysList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setZonePays, (state, payload: ZonePaysList) => ({
    ...state, zonePaysList: payload.zonePaysDtoList
  }))
);

export function reducer(state: ZonePaysState | undefined, action: Action) {
  return featureReducer(state, action);
}