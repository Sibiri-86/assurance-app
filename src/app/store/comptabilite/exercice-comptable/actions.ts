import { createAction, props } from '@ngrx/store';
import { ExerciceComptable, ExerciceComptableList } from './model';
export const createExerciceComptable = createAction('[App Init] Create ExerciceComptable', props<ExerciceComptable>());
export const updateExerciceComptable = createAction('[App Init] update ExerciceComptable', props<ExerciceComptable>());
export const deleteExerciceComptable = createAction('[App Init] delete ExerciceComptable', props<ExerciceComptable>());
export const loadExerciceComptable = createAction('[App Init] load ExerciceComptable');
export const setExerciceComptable = createAction('[App Init] set ExerciceComptable',  props<ExerciceComptableList>());

