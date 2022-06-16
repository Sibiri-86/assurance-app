import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TerritorialiteList } from './model';
import {TerritorialiteState} from './state';

const initialState : TerritorialiteState = {
  territorialiteList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTerritorialite, (state, payload: TerritorialiteList) => ({
    ...state, territorialiteList: payload.typeTerritorialiteDtoList
  }))
);

export function reducer(state: TerritorialiteState | undefined, action: Action) {
  return featureReducer(state, action);
}