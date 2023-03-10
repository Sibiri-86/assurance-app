import {AppState} from '../../app.state';
export const adherentList = (state: AppState) => state.adherentState.adherentList;
export const selectedAdherent = (state: AppState) => state.adherentState.selectedAdherentResearch;
export const listeActualisee = (state: AppState) => state.adherentState.listeActualisee;
export const conditionGeneraleList = (state: AppState) => state.adherentState.conditionGeneraleDtoList;

