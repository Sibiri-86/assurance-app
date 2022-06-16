import {props, createAction} from '@ngrx/store';
import { TypeIntermediaire, TypeIntermediaireList } from './model';
export const createTypeIntermediaire = createAction('[App Init] Create TypeIntermediaire', props<TypeIntermediaire>());
export const updateTypeIntermediaire = createAction('[App Init] update TypeIntermediaire', props<TypeIntermediaire>());
export const deleteTypeIntermediaire = createAction('[App Init] delete TypeIntermediaire', props<TypeIntermediaire>());
export const loadTypeIntermediaire = createAction('[App Init] load TypeIntermediaire');
export const setTypeIntermediaire = createAction('[App Init] set TypeIntermediaire',  props<TypeIntermediaireList>());
export const importTypeIntermediaire = createAction('[App Init] import TypeIntermediaire',  props<{file: File}>());