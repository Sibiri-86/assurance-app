import {AppState} from '../../app.state';
export const historiqueAvenantAdherantList = (state: AppState) => state.historiqueAvenantState.historiqueAvenantList;
export const historiqueAvenantAdherantFamilleList = (state: AppState) => state.historiqueAvenantAdherantState.historiqueAvenantAdherentList;
export const historiqueAvenantAdherantListByPoliceAndExercice = (state: AppState) => state.historiqueAvenantAdherantState.historiqueAvenantAdherentList;
