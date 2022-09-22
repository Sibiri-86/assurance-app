import { createReducer, on, Action } from '@ngrx/store';
import { ReportFile } from '../../contrat/police/model';
import * as featureActions from './actions';

import { AppelFondList } from './model';
import { AppelFondState } from './state';

const initialState : AppelFondState = {
  appelFondList: null,
  reportFile: null,

};

// @ts-ignore
const featureReducer = createReducer(
  initialState,
  on(featureActions.setAppelFond, (state, payload: AppelFondList) => ({
    ...state, appelFondList: payload.appelFondDtoList
  })),
  on(featureActions.setReportAppelFond, (state, payload: ReportFile) => ({
      ...state, reportFile: payload.reportFile
  }))
);

export function reducer(state: AppelFondState | undefined, action: Action) {
  return featureReducer(state, action);
}