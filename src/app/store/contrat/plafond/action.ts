import {props, createAction} from '@ngrx/store';
import { Groupe } from '../groupe/model';
import { Bareme, BaremeList, Plafond, PlafondGroupe, PlafondList } from './model';

export const createPlafond = createAction('[App Init] Create Plafond', props<Plafond>());
export const updatePlafond = createAction('[App Init] update Plafond', props<Plafond>());
export const deletePlafond = createAction('[App Init] delete Plafond', props<Plafond>());
export const deletePlafonds = createAction('[App Init] delete Plafonds', props<{plafondList:Array<Plafond>}>());
export const loadPlafond = createAction('[App Init] load Plafond');
export const setPlafond = createAction('[App Init] set Plafond',  props<PlafondList>());
export const loadPlafondGroupe = createAction('[App Init] load Plafond Groupe',props<Groupe>());
export const setPlafondGroupe = createAction('[App Init] set Plafond Groupe',  props<Plafond>());
export const importPlafond = createAction('[App Init] import Plafond',  props<{file: File}>());

/**action pour creer le bareme */
export const createBareme = createAction('[App Init] Create Bareme', props<Bareme>());
export const updateBareme = createAction('[App Init] update Bareme', props<Bareme>());
export const deleteBareme = createAction('[App Init] delete Bareme', props<Bareme>());
export const loadBareme = createAction('[App Init] load Bareme');
export const setBareme = createAction('[App Init] set bareme',  props<BaremeList>());