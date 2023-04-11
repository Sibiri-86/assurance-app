import {  RemboursementState } from "./state";
import * as featureActions from "./action";
import { Action, createReducer, on } from "@ngrx/store";
import { ReportFile } from "../../contrat/police/model";
import { RemboursementList } from "./model";

const initialState: RemboursementState = {
    remboursementDtoList: null,
    reportFile: null,
   
  };

const featureReducer = createReducer(
    initialState,
    on(featureActions.setRemboursement, (state, payload: RemboursementList) => ({
      ...state, remboursementDtoList: payload.remboursementDtoList
    })),
   
    on(featureActions.setReportRemboursement, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
      })),
   
  );

export function reducer(state: RemboursementState | undefined, action: Action) {
    return featureReducer(state, action);
  }
