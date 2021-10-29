import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { DepartementList } from './model';
import {DepartementState} from './state';

const initialState : DepartementState = {
  departementList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setDepartement, (state, payload: DepartementList) => ({
    ...state, departementList: payload.departementDtoList
  }))
);

export function reducer(state: DepartementState | undefined, action: Action) {
  return featureReducer(state, action);
}