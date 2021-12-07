import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './action';
import { Plafond, PlafondGroupe, PlafondList } from './model';
import {PlafondState} from './state';

const initialState : PlafondState = {
  plafondList: null,
  plafondGroupe: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPlafond, (state, payload: PlafondList) => ({
    ...state, plafondList: payload.plafondDtoList
  })),
  on(featureActions.setPlafondGroupe, (state, payload: Plafond) => ({
    ...state, plafondGroupe: payload
  }))

);

export function reducer(state: PlafondState | undefined, action: Action) {
  return featureReducer(state, action);
}