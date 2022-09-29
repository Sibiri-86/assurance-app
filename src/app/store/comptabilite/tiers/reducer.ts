import { createReducer, on, Action } from '@ngrx/store';
import { ReportFile } from '../../contrat/police/model';
import * as featureActions from './actions';
import { TiersList } from './model';
import { TiersState } from './state';

const initialState : TiersState = {
  tiersList: null,
  // reportFile: null,

};

// @ts-ignore
const featureReducer = createReducer(
  initialState,
  on(featureActions.setTiers, (state, payload: TiersList ) => ({
    ...state, tiersList: payload.tiersDTOList
  }))/* ,
  on(featureActions.setTiers, (state, payload: ReportFile) => ({
      ...state, reportFile: payload.reportFile
  })) */
);

export function reducer(state: TiersState | undefined, action: Action) {
  return featureReducer(state, action);
}