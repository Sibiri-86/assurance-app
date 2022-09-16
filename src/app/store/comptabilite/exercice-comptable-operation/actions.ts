import { createAction, props } from '@ngrx/store';
import { ExerciceComptableOperationList } from './model';
export const loadExerciceComptableOperation = createAction('[App Init] load ExerciceComptableOperation');
export const setExerciceComptableOperation = createAction('[App Init] set ExerciceComptableOperation',  props<ExerciceComptableOperationList>());
export const loadExerciceComptableOperationByJournal = createAction('[App Init] load ExerciceComptableOperation By Journal', props<{journalId: string}>());
