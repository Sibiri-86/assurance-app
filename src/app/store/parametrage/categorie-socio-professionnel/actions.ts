import {props, createAction} from '@ngrx/store';
import { CategorieSocioProfessionnel, CategorieSocioProfessionnelList } from './model';
export const createCategorieSocioProfessionnel = createAction('[App Init] Create CategorieSocioProfessionnel', props<CategorieSocioProfessionnel>());
export const updateCategorieSocioProfessionnel = createAction('[App Init] update CategorieSocioProfessionnel', props<CategorieSocioProfessionnel>());
export const deleteCategorieSocioProfessionnel = createAction('[App Init] delete CategorieSocioProfessionnel', props<CategorieSocioProfessionnel>());
export const loadCategorieSocioProfessionnel = createAction('[App Init] load CategorieSocioProfessionnel');
export const setCategorieSocioProfessionnel = createAction('[App Init] set CategorieSocioProfessionnel',  props<CategorieSocioProfessionnelList>());
export const importCategorieSocioProfessionnel = createAction('[App Init] import CategorieSocioProfessionnel',  props<{file: File}>());