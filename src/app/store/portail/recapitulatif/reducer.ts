import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import { ReportFile } from '../../../contrat/bulletin-adhesion/model';
import { RecapitulatifState } from './state';

const initialState: RecapitulatifState = {
    reportFile: null,
    
  };

const featureReducer = createReducer(
    initialState,
   
    /* on(featureActions.setDepenseFamille, (state, payload: DepenseFamilleList) => ({
        ...state, depenseFamilleList: payload.depenseFamilles
      })), */
    on(featureActions.setReportRecapitulatif, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    })),
   
  );
export function reducer(state: RecapitulatifState | undefined, action: Action) {
    return featureReducer(state, action);
  }
