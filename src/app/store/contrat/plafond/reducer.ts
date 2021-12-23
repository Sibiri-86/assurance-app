import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './action';
import { BaremeList, Plafond, PlafondConfig, PlafondGroupe, PlafondList } from './model';
import {PlafondState} from './state';

const initialState : PlafondState = {
  plafondList: null,
  plafondGroupe: null,
  baremeList:null,
  plafondConfig: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPlafond, (state, payload: PlafondList) => ({
    ...state, plafondList: payload.plafondDtoList
  })),
  on(featureActions.setPlafondGroupe, (state, payload: Plafond) => ({
    ...state, plafondGroupe: payload
  })),
  on(featureActions.setBareme, (state, payload: BaremeList) => ({
    ...state, baremeList: payload.baremeDtoList
  })),
  on(featureActions.setPlafondConfig, (state, payload: PlafondConfig) => ({
    ...state, plafondConfig: payload.dtoList
  }))

);

export function reducer(state: PlafondState | undefined, action: Action) {
  return featureReducer(state, action);
}