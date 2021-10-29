import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { NaturePrestataireList } from './model';
import {NaturePrestataireState} from './state';

const initialState : NaturePrestataireState = {
  naturePrestataireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setNaturePrestataire, (state, payload: NaturePrestataireList) => ({
    ...state, naturePrestataireList: payload.naturePrestataireDtoList
  }))
);

export function reducer(state: NaturePrestataireState | undefined, action: Action) {
  return featureReducer(state, action);
}