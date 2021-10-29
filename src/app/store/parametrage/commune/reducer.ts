import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { CommuneList } from './model';
import {CommuneState} from './state';

const initialState : CommuneState = {
  communeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setCommune, (state, payload: CommuneList) => ({
    ...state, communeList: payload.communeDtoList
  }))
);

export function reducer(state: CommuneState | undefined, action: Action) {
  return featureReducer(state, action);
}