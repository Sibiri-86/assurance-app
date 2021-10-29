import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ActeList } from './model';
import {ActeState} from './state';

const initialState : ActeState = {
  acteList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setActe, (state, payload: ActeList) => ({
    ...state, acteList: payload.typeActeDtoList
  }))
);

export function reducer(state: ActeState | undefined, action: Action) {
  return featureReducer(state, action);
}