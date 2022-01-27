import {AppState} from '../../app.state';

export const selectExerciceList = (state: AppState) => state.exerciceState.exerciceList;
export const selectActiveExercice = (state: AppState) => state.exerciceState.exerciceActive;
