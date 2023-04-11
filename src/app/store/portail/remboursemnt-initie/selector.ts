import {AppState} from '../../app.state';
export const remboursementList = (state: AppState) => state.remboursementState.remboursementDtoList;
export const selectByteFile = (state: AppState) => state.remboursementState.reportFile;
