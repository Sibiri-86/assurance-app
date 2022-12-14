import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import { ReportFile } from '../../../contrat/bulletin-adhesion/model';
import { FacturePrestatairesState } from './state';

const initialState: FacturePrestatairesState = {
    reportFile: null,
    
  };

const featureReducer = createReducer(
    initialState,
   
    /* on(featureActions.setDepenseFamille, (state, payload: DepenseFamilleList) => ({
        ...state, depenseFamilleList: payload.depenseFamilles
      })), */
    on(featureActions.setReportFacturePrestataires, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    })),
   
  );
export function reducer(state: FacturePrestatairesState | undefined, action: Action) {
    return featureReducer(state, action);
  }
