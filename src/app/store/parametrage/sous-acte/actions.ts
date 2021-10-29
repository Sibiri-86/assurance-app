import {props, createAction} from '@ngrx/store';
import { SousActe, SousActeList } from './model';
export const createSousActe = createAction('[App Init] Create SousActe', props<SousActe>());
export const updateSousActe = createAction('[App Init] update SousActe', props<SousActe>());
export const deleteSousActe = createAction('[App Init] delete SousActe', props<SousActe>());
export const loadSousActe = createAction('[App Init] load SousActe');
export const setSousActe = createAction('[App Init] set SousActe',  props<SousActeList>());
export const importSousActe = createAction('[App Init] import SousActe',  props<{file: File}>());