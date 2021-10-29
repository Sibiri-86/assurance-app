import {props, createAction} from '@ngrx/store';
import { Taux, TauxList } from './model';
export const createTaux = createAction('[App Init] Create Taux', props<Taux>());
export const updateTaux = createAction('[App Init] update Taux', props<Taux>());
export const deleteTaux = createAction('[App Init] delete Taux', props<Taux>());
export const loadTaux = createAction('[App Init] load Taux');
export const setTaux = createAction('[App Init] set Taux',  props<TauxList>());
export const importTaux = createAction('[App Init] import Taux',  props<{file: File}>());