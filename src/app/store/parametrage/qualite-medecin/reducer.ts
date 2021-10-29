import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { QualiteMedecinList } from './model';
import {QualiteMedecinState} from './state';

const initialState : QualiteMedecinState = {
  qualiteMedecinList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setQualiteMedecin, (state, payload: QualiteMedecinList) => ({
    ...state, qualiteMedecinList: payload.qualiteMedecinDtoList
  }))
);

export function reducer(state: QualiteMedecinState | undefined, action: Action) {
  return featureReducer(state, action);
}