import {props, createAction} from '@ngrx/store';
import {HistoriqueAvenant, HistoriqueAvenantList} from './model';
export const createHistoriqueAvenant = createAction('[App Init] Create HistoriqueAvenant', props<HistoriqueAvenant>());
export const updateHistoriqueAvenant = createAction('[App Init] update HistoriqueAvenant', props<HistoriqueAvenant>());
export const deleteHistoriqueAvenant = createAction('[App Init] delete HistoriqueAvenant', props<HistoriqueAvenant>());
export const loadHistoriqueAvenant = createAction('[App Init] load HistoriqueAvenant', props<{policeId: string}>());
export const setHistoriqueAvenant = createAction('[App Init] set HistoriqueAvenant',  props<HistoriqueAvenantList>());

