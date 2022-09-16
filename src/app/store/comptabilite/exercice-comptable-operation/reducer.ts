import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ExerciceComptableOperationList } from './model';
import { ExerciceComptableOperationState } from './state';



const initialState : ExerciceComptableOperationState = {
  exerciceComptableOperationList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setExerciceComptableOperation, (state, payload: ExerciceComptableOperationList) => ({
    ...state, exerciceComptableOperationList: payload.exerciceComptableOperationList
  }))
);

export function reducer(state: ExerciceComptableOperationState | undefined, action: Action) {
  return featureReducer(state, action);
}