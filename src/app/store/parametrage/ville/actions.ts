import {props, createAction} from '@ngrx/store';
import { Ville, VilleList } from './model';
export const createVille = createAction('[App Init] Create Ville', props<Ville>());
export const updateVille = createAction('[App Init] update Ville', props<Ville>());
export const deleteVille = createAction('[App Init] delete Ville', props<Ville>());
export const loadVille = createAction('[App Init] load Ville');
export const setVille = createAction('[App Init] set Ville',  props<VilleList>());
export const importVille = createAction('[App Init] import Ville',  props<{file: File}>());