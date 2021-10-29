import {props, createAction} from '@ngrx/store';
import { TypePrestataire, TypePrestataireList } from './model';
export const createTypePrestataire = createAction('[App Init] Create TypePrestataire', props<TypePrestataire>());
export const updateTypePrestataire = createAction('[App Init] update TypePrestataire', props<TypePrestataire>());
export const deleteTypePrestataire = createAction('[App Init] delete TypePrestataire', props<TypePrestataire>());
export const loadTypePrestataire = createAction('[App Init] load TypePrestataire');
export const setTypePrestataire = createAction('[App Init] set TypePrestataire',  props<TypePrestataireList>());
export const importTypePrestataire = createAction('[App Init] import TypePrestataire',  props<{file: File}>());