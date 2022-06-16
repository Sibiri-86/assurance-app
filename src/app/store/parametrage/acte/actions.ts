import {props, createAction} from '@ngrx/store';
import { Acte, ActeList } from './model';
export const createActe = createAction('[App Init] Create Acte', props<Acte>());
export const updateActe = createAction('[App Init] update Acte', props<Acte>());
export const deleteActe = createAction('[App Init] delete Acte', props<Acte>());
export const loadActe = createAction('[App Init] load Acte');
export const setActe = createAction('[App Init] set Acte',  props<ActeList>());
export const importActe = createAction('[App Init] import Acte',  props<{file: File}>());