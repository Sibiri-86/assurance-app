import { createAction, props } from '@ngrx/store';
import { TypeJournaux, TypeJournauxList } from './model';
export const createTypeJournaux = createAction('[App Init] Create TypeJournaux', props<TypeJournaux>());
export const updateTypeJournaux = createAction('[App Init] update TypeJournaux', props<TypeJournaux>());
export const deleteTypeJournaux = createAction('[App Init] delete TypeJournaux', props<TypeJournaux>());
export const loadTypeJournaux = createAction('[App Init] load TypeJournaux');
export const setTypeJournaux = createAction('[App Init] set TypeJournaux',  props<TypeJournauxList>());
export const importTypeJournaux = createAction('[App Init] import TypeJournaux',  props<{file: File}>());

