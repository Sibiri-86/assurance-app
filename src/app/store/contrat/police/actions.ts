import {props, createAction} from '@ngrx/store';
import { Report } from './model';

import { Police, PoliceList, Statistique } from './model';
export const createPolice = createAction('[App Init] Create Police', props<Police>());
export const updatePolice = createAction('[App Init] update Police', props<Police>());
export const validerPolice = createAction('[App Init] valider Police', props<Police>());
export const deletePolice = createAction('[App Init] delete Police', props<Police>());
export const deletePolices = createAction('[App Init] delete Polices', props<{PoliceList:Array<Police>}>());
export const loadPolice = createAction('[App Init] load Police');
export const loadStatistique = createAction('[App Init] load Statistique');
export const setStatistique = createAction('[App Init] set Statistique', props<Statistique>());
export const setPolice = createAction('[App Init] set Police',  props<PoliceList>());
export const importPolice = createAction('[App Init] import Police',  props<{file: File}>());
export const FetchReport = createAction('[Report] Fetch Report', props<Report>());
export const setReport = createAction('[set Report] set Report', props<{file: ArrayBuffer}>());
