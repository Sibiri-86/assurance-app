import {AppState} from '../../app.state';
export const prefinancementList = (state: AppState) => state.prefinancementState.prefinancementList;
export const ordreReglementList = (state: AppState) => state.prefinancementState.ordreReglementList;
export const selectByteFile = (state: AppState) => state.prefinancementState.reportFile;
export const selectCheckPrefinancementReponse = (state: AppState) => state.prefinancementState.checkPrefinancementReponse;
