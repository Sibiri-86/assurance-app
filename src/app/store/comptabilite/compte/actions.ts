import {props, createAction} from '@ngrx/store';
import { Compte, CompteList } from './model';
export const loadCompte = createAction('[App Init] load Compte');
export const importCompte = createAction('[App Init] import Compte',  props<{file: File}>());
export const setCompte = createAction('[App Init] set Compte',  props<CompteList>());
export const createCompte = createAction('[App Init] Create Compte', props<Compte>());
export const updateCompte = createAction('[App Init] update Compte', props<Compte>());
