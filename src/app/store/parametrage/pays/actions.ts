import {props, createAction} from '@ngrx/store';
import { Pays, PaysList } from './model';
export const createPays = createAction('[App Init] Create Pays', props<Pays>());
export const updatePays = createAction('[App Init] update Pays', props<Pays>());
export const deletePays = createAction('[App Init] delete Pays', props<Pays>());
export const loadPays = createAction('[App Init] load Pays');
export const setPays = createAction('[App Init] set Pays',  props<PaysList>());
export const importPays = createAction('[App Init] import Pays',  props<{file: File}>());