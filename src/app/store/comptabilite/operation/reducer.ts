import { createReducer, on, Action } from '@ngrx/store';
import { ReportFile } from '../../contrat/police/model';
import * as featureActions from './actions';
import { OperationLeutreeList, OperationList } from './model';
import { OperationState } from './state';




const initialState : OperationState = {
  operationList: null,
  reportFile: null,
  operationLeutreeList: null,
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setOperation, (state, payload: OperationList) => ({
    ...state, operationList: payload.operationList
  })),
  on(featureActions.setReportArrete, (state, payload: ReportFile) => ({
    ...state, reportFile: payload.reportFile
  })),
  on(featureActions.setOperationLeutree, (state, payload: OperationLeutreeList) => ({
    ...state, operationLeutreeList: payload.operationLeutreeList
  }))
);

export function reducer(state: OperationState | undefined, action: Action) {
  return featureReducer(state, action);
}