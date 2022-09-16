import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ExerciceComptableList } from './model';
import { ExerciceComptableState } from './state';


const initialState : ExerciceComptableState = {
  exerciceComptableList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setExerciceComptable, (state, payload: ExerciceComptableList) => ({
    ...state, exerciceComptableList: payload.exerciceComptableList
  }))
);

export function reducer(state: ExerciceComptableState | undefined, action: Action) {
  return featureReducer(state, action);
}