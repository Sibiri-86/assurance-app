import { createReducer, on, Action } from '@ngrx/store';
import { ReportFile } from '../../contrat/police/model';
import * as featureActions from './actions';
import { JournauxList } from './model';
import { JournauxState } from './state';

const initialState : JournauxState = {
  journauxList: null,
  reportFile: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setJournaux, (state, payload: JournauxList) => ({
    ...state, journauxList: payload.journauxList
  })),
  on(featureActions.setReportBalanceHuit, (state, payload: ReportFile) => ({
      ...state, reportFile: payload.reportFile
  }))
);

export function reducer(state: JournauxState | undefined, action: Action) {
  return featureReducer(state, action);
}