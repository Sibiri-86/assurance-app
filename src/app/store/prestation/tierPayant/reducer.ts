import {SinistreTierPayantState} from './state';
import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import {SinistreTierPayantList} from './model';
import {ReportFile} from '../../contrat/police/model';

const initialState: SinistreTierPayantState = {
    sinsitreTierPayantList: null,
    reportFile: null
    /* ordreReglementList: null,*/
  };

const featureReducer = createReducer(
    initialState,
    on(featureActions.setTierPayant, (state, payload: SinistreTierPayantList) => ({
      ...state, sinsitreTierPayantList: payload.sinistreTierPayantDTOList
    })),
    /* on(featureActions.setLoadOrdreReglement, (state, payload: OrdreReglementList) => ({
        ...state, ordreReglementList: payload.ordreReglementDtoList
      })) */
    on(featureActions.setReportTierPayant, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    }))
  );
export function reducer(state: SinistreTierPayantState | undefined, action: Action) {
    return featureReducer(state, action);
  }
