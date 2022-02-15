import {AppState} from '../../app.state';
export const tierPayantList = (state: AppState) => state.tierPayantState.sinsitreTierPayantList;
export const selectByteFile = (state: AppState) => state.tierPayantState.reportFile;
export const ordreReglementTierPayantList = (state: AppState) => state.tierPayantState.ordreReglementTierPayantList;
export const checkTierPayantReponse = (state: AppState) => state.tierPayantState.checkTierPayantReponse;
