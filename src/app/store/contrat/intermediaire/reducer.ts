import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { IntermediaireList } from './model';
import {IntermediaireState} from './state';

const initialState : IntermediaireState = {
  intermediaireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setIntermediaire, (state, payload: IntermediaireList) => ({
    ...state, intermediaireList: payload.intermediaireDtoList
  }))
);

export function reducer(state: IntermediaireState | undefined, action: Action) {
  return featureReducer(state, action);
}