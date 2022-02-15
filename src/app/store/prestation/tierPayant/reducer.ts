import {SinistreTierPayantState} from './state';
import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import {CheckTierPayantReponse, OrdreReglementTierPayantList, SinistreTierPayantList} from './model';
import {ReportFile} from '../../contrat/police/model';
import {CheckPrefinancementReponse, OrdreReglementList} from '../prefinancement/model';

const initialState: SinistreTierPayantState = {
    sinsitreTierPayantList: null,
    reportFile: null,
    ordreReglementTierPayantList: null,
    checkTierPayantReponse: null,
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
    })),
    on(featureActions.setTierPayantResponse, (state, payload: CheckTierPayantReponse) => ({
        ...state, checkTierPayantReponse: payload.TierPayantCheckReponse
    }))
  );
export function reducer(state: SinistreTierPayantState | undefined, action: Action) {
    return featureReducer(state, action);
  }
