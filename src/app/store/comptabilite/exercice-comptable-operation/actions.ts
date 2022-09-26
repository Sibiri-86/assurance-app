import { createAction, props } from '@ngrx/store';
import { OperationList } from '../operation/model';
import { ExerciceComptableOperationList } from './model';
export const loadExerciceComptableOperation = createAction('[App Init] load ExerciceComptableOperation');
export const setExerciceComptableOperation = createAction('[App Init] set ExerciceComptableOperation',  props<ExerciceComptableOperationList>());
export const loadExerciceComptableOperationByJournal = createAction('[App Init] load ExerciceComptableOperation By Journal', props<{journalId: string}>());
export const loadOperations = createAction('[App Init] load Operation');
export const setOperations = createAction('[App Init] set Operation',  props<OperationList>());

