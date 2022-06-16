import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TypePrestataireList } from './model';
import {TypePrestataireState} from './state';

const initialState : TypePrestataireState = {
  typePrestataireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTypePrestataire, (state, payload: TypePrestataireList) => ({
    ...state, typePrestataireList: payload.typePrestataireDtoList
  }))
);

export function reducer(state: TypePrestataireState | undefined, action: Action) {
  return featureReducer(state, action);
}