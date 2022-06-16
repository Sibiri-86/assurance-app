import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ArrondissementList } from './model';
import {ArrondissementState} from './state';

const initialState : ArrondissementState = {
  ArrondissementList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setArrondissement, (state, payload: ArrondissementList) => ({
    ...state, ArrondissementList: payload.arrondissementDtoList
  }))
);

export function reducer(state: ArrondissementState | undefined, action: Action) {
  return featureReducer(state, action);
}