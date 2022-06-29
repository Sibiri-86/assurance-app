import {AppState} from '../../app.state';
export const plafondList = (state: AppState) => state.plafondState.plafondList;
export const plafondGroupe = (state: AppState) => state.plafondState.plafondGroupe;
export const baremeList = (state: AppState) => state.plafondState.baremeList;
export const plafondConfig = (state: AppState) => state.plafondState.plafondConfig;
export const plafondConfigSansTaux = (state: AppState) => state.plafondState.plafondConfig;
export const plafondEnCours = (state: AppState) => state.plafondState.plafondGroupeFamilleActeListe;
export const plafondActeEnCours = (state: AppState) => state.plafondState.plafondGroupeActeListe;
export const plafondSousActeEnCours = (state: AppState) => state.plafondState.plafondGroupeSousActeListe;
