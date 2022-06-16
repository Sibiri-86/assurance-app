import {props, createAction} from '@ngrx/store';
import { ZonePays, ZonePaysList } from './model';
export const createZonePays = createAction('[App Init] Create ZonePays', props<ZonePays>());
export const updateZonePays = createAction('[App Init] update ZonePays', props<ZonePays>());
export const deleteZonePays = createAction('[App Init] delete ZonePays', props<ZonePays>());
export const loadZonePays = createAction('[App Init] load ZonePays');
export const setZonePays = createAction('[App Init] set ZonePays',  props<ZonePaysList>());
export const importZonePays = createAction('[App Init] import ZonePays',  props<{file: File}>());