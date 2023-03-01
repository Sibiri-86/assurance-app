import {props, createAction} from '@ngrx/store';
import { DateGarde, DateGardeList } from './model';
export const createDateGarde = createAction('[App Init] Create DateGarde', props<DateGarde>());
export const updateDateGarde = createAction('[App Init] update DateGarde', props<DateGarde>());
export const deleteDateGarde = createAction('[App Init] delete DateGarde', props<DateGarde>());
export const loadDateGarde = createAction('[App Init] load DateGarde');
export const setDateGarde = createAction('[App Init] set DateGarde',  props<DateGardeList>());
export const importDateGarde = createAction('[App Init] import DateGarde',  props<{file: File}>());
