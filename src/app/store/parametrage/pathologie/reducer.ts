import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PathologieList } from './model';
import {PathologieState} from './state';

const initialState : PathologieState = {
  pathologieList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPathologie, (state, payload: PathologieList) => ({
    ...state, pathologieList: payload.pathologieDtoList
  }))
);

export function reducer(state: PathologieState | undefined, action: Action) {
  return featureReducer(state, action);
}