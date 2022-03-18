import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { BonPriseEnChargeList, ReportFile } from './model';
import {BonPriseEnChargeState} from './state';

const initialState: BonPriseEnChargeState = {
  bonPriseEnChargeList: null,
  reportFile: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setBon, (state, payload: BonPriseEnChargeList) => ({
    ...state, bonPriseEnChargeList: payload.bonPriseEnChargeList
  })),
  on(featureActions.setReportBon, (state, payload: ReportFile) => ({
    ...state, reportFile: payload.reportFile
  })),
);

export function reducer(state: BonPriseEnChargeState | undefined, action: Action) {
  return featureReducer(state, action);
}
