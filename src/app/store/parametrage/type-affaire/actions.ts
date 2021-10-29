import {props, createAction} from '@ngrx/store';
import { TypeAffaire, TypeAffaireList } from './model';
export const createTypeAffaire = createAction('[App Init] Create TypeAffaire', props<TypeAffaire>());
export const updateTypeAffaire = createAction('[App Init] update TypeAffaire', props<TypeAffaire>());
export const deleteTypeAffaire = createAction('[App Init] delete TypeAffaire', props<TypeAffaire>());
export const loadTypeAffaire = createAction('[App Init] load TypeAffaire');
export const setTypeAffaire = createAction('[App Init] set TypeAffaire',  props<TypeAffaireList>());
export const importTypeAffaire = createAction('[App Init] import TypeAffaire',  props<{file: File}>());