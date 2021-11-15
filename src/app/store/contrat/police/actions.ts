import {props, createAction} from '@ngrx/store';
import { Police, PoliceList } from './model';
export const createPolice = createAction('[App Init] Create Police', props<Police>());
export const updatePolice = createAction('[App Init] update Police', props<Police>());
export const validerPolice = createAction('[App Init] valider Police', props<Police>());
export const deletePolice = createAction('[App Init] delete Police', props<Police>());
export const deletePolices = createAction('[App Init] delete Polices', props<{PoliceList:Array<Police>}>());
export const loadPolice = createAction('[App Init] load Police');
export const setPolice = createAction('[App Init] set Police',  props<PoliceList>());
export const importPolice = createAction('[App Init] import Police',  props<{file: File}>());
export const loadPoliceByAffNouv = createAction('[App Init] load Police');
export const setPoliceByAffNou = createAction('[App Init] set Police',  props<PoliceList>());

