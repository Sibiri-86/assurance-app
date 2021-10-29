import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ProfessionList } from './model';
import {ProfessionState} from './state';

const initialState : ProfessionState = {
  professionList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setProfession, (state, payload: ProfessionList) => ({
    ...state, professionList: payload.typeProfessionDtoList
  }))
);

export function reducer(state: ProfessionState | undefined, action: Action) {
  return featureReducer(state, action);
}