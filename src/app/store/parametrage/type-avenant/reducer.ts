import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TypeAvenantList } from './model';
import {TypeAvenantState} from './state';

const initialState : TypeAvenantState = {
  typeAvenantList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTypeAvenant, (state, payload: TypeAvenantList) => ({
    ...state, typeAvenantList: payload.typeAvenantDtoList
  }))
);

export function reducer(state: TypeAvenantState | undefined, action: Action) {
  return featureReducer(state, action);
}