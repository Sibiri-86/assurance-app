import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import { ReportFile } from '../../../contrat/bulletin-adhesion/model';
import { ConsommationParSexeState } from './state';

const initialState: ConsommationParSexeState = {
    reportFile: null,
    
  };

const featureReducer = createReducer(
    initialState,
   
    /* on(featureActions.setDepenseFamille, (state, payload: DepenseFamilleList) => ({
        ...state, depenseFamilleList: payload.depenseFamilles
      })), */
    on(featureActions.setReportConsommationParSexe, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    })),
   
  );
export function reducer(state: ConsommationParSexeState | undefined, action: Action) {
    return featureReducer(state, action);
  }
