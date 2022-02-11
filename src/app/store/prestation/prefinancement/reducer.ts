import { PrefinancementState } from "./state";
import * as featureActions from "./action";
import { Action, createReducer, on } from "@ngrx/store";
import { CheckPrefinancementReponse, OrdreReglementList, PrefinancementList } from "./model";
import { ReportFile } from "../../contrat/police/model";

const initialState: PrefinancementState = {
    prefinancementList: null,
    ordreReglementList: null,
    reportFile: null,
    checkPrefinancementReponse: null
  };
  
const featureReducer = createReducer(
    initialState,
    on(featureActions.setPrefinancement, (state, payload: PrefinancementList) => ({
      ...state, prefinancementList: payload.prefinancementDtoList
    })),
    on(featureActions.setLoadOrdreReglement, (state, payload: OrdreReglementList) => ({
        ...state, ordreReglementList: payload.ordreReglementDtoList
      })),
    on(featureActions.setReportPrestation, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
      })),
    on(featureActions.setCheckPrefinancement, (state, payload: CheckPrefinancementReponse) => ({
        ...state, checkPrefinancementReponse: payload.prefinancementCheckReponse
      }))
  );
  
export function reducer(state: PrefinancementState | undefined, action: Action) {
    return featureReducer(state, action);
  }
