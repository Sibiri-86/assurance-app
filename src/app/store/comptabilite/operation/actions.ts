import { createAction, props } from '@ngrx/store';
import { Operation, OperationList } from './model';
export const createOperation = createAction('[App Init] Create Operation', props<Operation>());
export const updateOperation = createAction('[App Init] update Operation', props<Operation>());
export const deleteOperation = createAction('[App Init] delete Operation', props<Operation>());
export const loadOperation = createAction('[App Init] load Operation');
export const setOperation = createAction('[App Init] set Operation',  props<OperationList>());
export const loadOperationByExerciceOperation = createAction('[App Init] load Operation By Exercice', props<{exerciceOperationId: string}>());


