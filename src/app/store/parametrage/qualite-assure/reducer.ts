import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { QualiteAssureList } from './model';
import {QualiteAssureState} from './state';

const initialState : QualiteAssureState = {
  qualiteAssureList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setQualiteAssure, (state, payload: QualiteAssureList) => ({
    ...state, qualiteAssureList: payload.typeQualiteAssureDtoList
  }))
);

export function reducer(state: QualiteAssureState | undefined, action: Action) {
  return featureReducer(state, action);
}