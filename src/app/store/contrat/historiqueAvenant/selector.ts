import {AppState} from '../../app.state';
export const historiqueAvenantList = (state?: AppState) => state.historiqueAvenantState.historiqueAvenantList;
export const historiquePlafondGroupe = (state: AppState) => state.historiqueAvenantState.historiquePlafondGroupe;
export const historiquePlafondGroupeFamilleActe = (state: AppState) => state.historiqueAvenantState.historiquePlafondGroupeFamilleActe;
export const historiquePlafondGroupeActe = (state: AppState) => state.historiqueAvenantState.historiquePlafondGroupeActe;
export const historiquePlafondGroupeSousActe = (state: AppState) => state.historiqueAvenantState.historiquePlafondGroupeSousActe;
export const historiqueAvenantListWithoutActive = (state: any) => state.historiqueAvenantState.historiqueAvenantListWithoutActive;
export const historiqueAvenantListByExercice = (state: any) => state.historiqueAvenantState.historiqueAvenantListByExercie;
export const isOverlap = (state: any) => state.historiqueAvenantState.isOverlap;
