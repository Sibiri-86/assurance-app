import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PoliceList, ReportFile, Statistique } from './model';
import {PoliceState} from './state';

const initialState : PoliceState = {
  policeList: null,
  statistique: null,
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
  on(featureActions.setReport, (state, payload: ReportFile) => ({
    ...state, reportFile: payload.file
  }))
);

export function reducer(state: PoliceState | undefined, action: Action) {
  return featureReducer(state, action);
}