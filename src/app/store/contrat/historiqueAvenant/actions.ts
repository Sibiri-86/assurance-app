import {props, createAction} from '@ngrx/store';
import {HistoriqueAvenant, HistoriqueAvenantList} from './model';
export const createHistoriqueAvenant = createAction('[App Init] Create HistoriqueAvenant', props<HistoriqueAvenant>());
export const updateHistoriqueAvenant = createAction('[App Init] update Adherent', props<HistoriqueAvenant>());
export const deleteHistoriqueAvenant = createAction('[App Init] delete Adherent', props<HistoriqueAvenant>());
export const loadHistoriqueAvenant = createAction('[App Init] load Adherent', props<{policeId: string}>());
export const setHistoriqueAvenant = createAction('[App Init] set Adherent',  props<HistoriqueAvenantList>());
