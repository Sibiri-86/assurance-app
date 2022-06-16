import {props, createAction} from '@ngrx/store';
import { Status, StatusList } from './model';
export const createStatus = createAction('[App Init] Create Status', props<Status>());
export const updateStatus = createAction('[App Init] update Status', props<Status>());
export const deleteStatus = createAction('[App Init] delete Status', props<Status>());
export const loadStatus = createAction('[App Init] load Status');
export const setStatus = createAction('[App Init] set Status',  props<StatusList>());
export const importStatus = createAction('[App Init] import Status',  props<{file: File}>());