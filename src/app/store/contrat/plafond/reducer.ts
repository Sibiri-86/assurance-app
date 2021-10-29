import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './action';
import { PlafondList } from './model';
import {PlafondState} from './state';

const initialState : PlafondState = {
  plafondList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPlafond, (state, payload: PlafondList) => ({
    ...state, plafondList: payload.plafondDtoList
  }))
);

export function reducer(state: PlafondState | undefined, action: Action) {
  return featureReducer(state, action);
}