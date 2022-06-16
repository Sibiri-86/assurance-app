import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PrestataireList } from './model';
import {PrestataireState} from './state';

const initialState : PrestataireState = {
  prestataireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPrestataire, (state, payload: PrestataireList) => ({
    ...state, prestataireList: payload.prestataireDtoList
  }))
);

export function reducer(state: PrestataireState | undefined, action: Action) {
  return featureReducer(state, action);
}