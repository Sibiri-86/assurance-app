import { createReducer, on, Action } from '@ngrx/store';
import { OperationList } from '../operation/model';
import * as featureActions from './actions';
import { ExerciceComptableOperationList } from './model';
import { ExerciceComptableOperationState } from './state';



const initialState : ExerciceComptableOperationState = {
  exerciceComptableOperationList: null,
  operationList: null,
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setExerciceComptableOperation, (state, payload: ExerciceComptableOperationList) => ({
    ...state, exerciceComptableOperationList: payload.exerciceComptableOperationList
  })),
  on(featureActions.setOperations, (state, payload: OperationList) => ({
      ...state, operationList: payload.operationList
  }))
);

export function reducer(state: ExerciceComptableOperationState | undefined, action: Action) {
  return featureReducer(state, action);
}