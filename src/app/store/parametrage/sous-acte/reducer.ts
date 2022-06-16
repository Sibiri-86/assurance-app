import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { SousActeList } from './model';
import {SousActeState} from './state';

const initialState : SousActeState = {
  sousActeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setSousActe, (state, payload: SousActeList) => ({
    ...state, sousActeList: payload.typeSousActeDtoList
  }))
);

export function reducer(state: SousActeState | undefined, action: Action) {
  return featureReducer(state, action);
}