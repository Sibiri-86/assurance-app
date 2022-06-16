import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { RegionList } from './model';
import {RegionState} from './state';

const initialState : RegionState = {
  regionList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setRegion, (state, payload: RegionList) => ({
    ...state, regionList: payload.regionDtoList
  }))
);

export function reducer(state: RegionState | undefined, action: Action) {
  return featureReducer(state, action);
}