import {props, createAction} from '@ngrx/store';
import { Plafond, PlafondList } from './model';
export const createPlafond = createAction('[App Init] Create Plafond', props<Plafond>());
export const updatePlafond = createAction('[App Init] update Plafond', props<Plafond>());
export const deletePlafond = createAction('[App Init] delete Plafond', props<Plafond>());
export const deletePlafonds = createAction('[App Init] delete Plafonds', props<{plafondList:Array<Plafond>}>());
export const loadPlafond = createAction('[App Init] load Plafond');
export const setPlafond = createAction('[App Init] set Plafond',  props<PlafondList>());
export const importPlafond = createAction('[App Init] import Plafond',  props<{file: File}>());