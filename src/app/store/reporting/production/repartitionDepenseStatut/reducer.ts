import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import { ReportFile } from '../../../contrat/bulletin-adhesion/model';
import { RepartitionDepenseStatutState } from './state';

const initialState: RepartitionDepenseStatutState = {
    reportFile: null,
    
  };

const featureReducer = createReducer(
    initialState,
   
    /* on(featureActions.setDepenseFamille, (state, payload: DepenseFamilleList) => ({
        ...state, depenseFamilleList: payload.depenseFamilles
      })), */
    on(featureActions.setReportRepartitionDepenseStatut, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    })),
   
  );
export function reducer(state: RepartitionDepenseStatutState | undefined, action: Action) {
    return featureReducer(state, action);
  }