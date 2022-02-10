import {SinistreTierPayantState} from './state';
import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import {OrdreReglementTierPayantList, SinistreTierPayantList} from './model';
import {ReportFile} from '../../contrat/police/model';

const initialState: SinistreTierPayantState = {
    sinsitreTierPayantList: null,
    reportFile: null,
    ordreReglementTierPayantList: null,
  };

const featureReducer = createReducer(
    initialState,
    on(featureActions.setTierPayant, (state, payload: SinistreTierPayantList) => ({
      ...state, sinsitreTierPayantList: payload.sinistreTierPayantDTOList
    })),
    on(featureActions.setLoadOrdreReglementTierPayant, (state, payload: OrdreReglementTierPayantList) => ({
        ...state, ordreReglementTierPayantList: payload.ordreReglementTierPayantDTOList
      })),
    on(featureActions.setReportTierPayant, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    }))
  );
export function reducer(state: SinistreTierPayantState | undefined, action: Action) {
    return featureReducer(state, action);
  }
