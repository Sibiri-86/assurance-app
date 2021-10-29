import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TypeIntermediaireList } from './model';
import {TypeIntermediaireState} from './state';

const initialState : TypeIntermediaireState = {
  typeIntermediaireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTypeIntermediaire, (state, payload: TypeIntermediaireList) => ({
    ...state, typeIntermediaireList: payload.typeIntermediaireDtoList
  }))
);

export function reducer(state: TypeIntermediaireState | undefined, action: Action) {
  return featureReducer(state, action);
}