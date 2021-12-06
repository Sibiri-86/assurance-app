import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PoliceList, Rapport, ReportFile, Statistique } from './model';
import {PoliceState} from './state';

const initialState : PoliceState = {
  policeList: null,
  statistique: null,
  rapport: null,
  reportFile: null
};


const featureReducer = createReducer(
  initialState,
  on(featureActions.setPolice, (state, payload: PoliceList) => ({
    ...state, policeList: payload.policeDtoList
  })),
  on(featureActions.setStatistique, (state, payload: Statistique) => ({
    ...state, statistique: payload
  })),
  on(featureActions.setRapport, (state, payload: Rapport) => ({
    ...state, rapport: payload
  })),
  on(featureActions.setReport, (state, payload: ReportFile) => ({
    ...state, reportFile: payload.reportFile
  }))
);

export function reducer(state: PoliceState | undefined, action: Action) {
  return featureReducer(state, action);
}