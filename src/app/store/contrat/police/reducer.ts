import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PoliceList } from './model';
import {PoliceState} from './state';

const initialState : PoliceState = {
  policeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPolice, (state, payload: PoliceList) => ({
    ...state, policeList: payload.policeDtoList
  }))
);

export function reducer(state: PoliceState | undefined, action: Action) {
  return featureReducer(state, action);
}