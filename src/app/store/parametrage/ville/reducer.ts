import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { VilleList } from './model';
import {VilleState} from './state';

const initialState : VilleState = {
  villeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setVille, (state, payload: VilleList) => ({
    ...state, villeList: payload.villeDtoList
  }))
);

export function reducer(state: VilleState | undefined, action: Action) {
  return featureReducer(state, action);
}