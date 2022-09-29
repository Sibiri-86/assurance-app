import {AppState} from '../../app.state';
export const operationList = (state: AppState) => state.operationState.operationList;
export const operationArreterList = (state: AppState) => state.operationState.operationList;
export const selectByteFile = (state: AppState) => state.operationState.reportFile;