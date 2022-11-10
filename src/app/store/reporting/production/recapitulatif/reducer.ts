import {DepenseFamilleState} from './state';
import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import { DepenseFamilleList } from './model';
import { ReportFile } from '../../contrat/bulletin-adhesion/model';

const initialState: DepenseFamilleState = {
  depenseFamilleList: null,
    reportFile: null,
    
  };

const featureReducer = createReducer(
    initialState,
   
    on(featureActions.setDepenseFamille, (state, payload: DepenseFamilleList) => ({
        ...state, depenseFamilleList: payload.depenseFamilles
      })),
    on(featureActions.setReportDepenseFamille, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    })),
   
  );
export function reducer(state: DepenseFamilleState | undefined, action: Action) {
    return featureReducer(state, action);
  }
