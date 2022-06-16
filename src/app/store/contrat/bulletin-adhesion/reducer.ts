import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { BulletinAdhesionList } from './model';
import { BulletinAdhesionState } from './state';

const initialState: BulletinAdhesionState = {
  bulletinAdhesionList: [],
  reportFile: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setBulletin, (state, payload: BulletinAdhesionList) => ({
    ...state, bulletinAdhesionList: payload.bulletinAdhesionList
  })),
  /* on(featureActions.setReportBu, (state, payload: ReportFile) => ({
    ...state, reportFile: payload.reportFile
  })), */
);

export function reducer(state: BulletinAdhesionState | undefined, action: Action) {
  return featureReducer(state, action);
}
