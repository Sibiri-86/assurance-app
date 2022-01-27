import {ExerciceState} from './state';
import {Action, createReducer, on} from '@ngrx/store';
import * as featureActions from '../exercice/actions';

const initialState: ExerciceState = {
  exerciceList: [],
  exerciceActive: {}
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setExerciceList, (state, payload) => ({
	...state, exerciceList: payload.exerciceList
  })),
  on(featureActions.setExerciceActif, (state, payload) => ({
	...state, exerciceActive: payload.exerciceActif
  })),
);

export function reducer(state: ExerciceState | undefined, action: Action) {
	return featureReducer(state, action);
}
