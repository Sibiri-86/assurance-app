import * as featureActions from "./action";
import { Action, createReducer, on } from "@ngrx/store";
import { ReportFile } from "../../contrat/police/model";
import { BonPrestataire, BonPrestataireList } from "./model";
import { BonPrestataireState } from "./state";

const initialState: BonPrestataireState = {
    bonPrestataireDtoList: null,
    reportFile: null,
   
  };

const featureReducer = createReducer(
    initialState,
    on(featureActions.setBonPrestataire, (state, payload: BonPrestataireList) => ({
      ...state, bonPrestataireDtoList: payload.bonPrestataireDtoList
    })),
   
    on(featureActions.setReportBonPrestataire, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
      })),
   
  );

export function reducer(state: BonPrestataireState | undefined, action: Action) {
    return featureReducer(state, action);
  }
