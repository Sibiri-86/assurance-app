import {props, createAction} from '@ngrx/store';
import { Alerte, AlerteList } from './model';
export const createAlerte = createAction('[App Init] Create Alerte', props<Alerte>());
export const updateAlerte = createAction('[App Init] update Alerte', props<Alerte>());
export const deleteAlerte = createAction('[App Init] delete Alerte', props<Alerte>());
export const loadAlerte = createAction('[App Init] load Alerte');
export const setAlerte = createAction('[App Init] set Alerte',  props<AlerteList>());
export const importAlerte = createAction('[App Init] import Alerte',  props<{file: File}>());