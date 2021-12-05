import {props, createAction} from '@ngrx/store';
import {HistoriqueAvenant, HistoriqueAvenantList} from './model';
export const createHistoriqueAvenant = createAction('[App Init] Create HistoriqueAvenant', props<HistoriqueAvenant>());
export const updateHistoriqueAvenant = createAction('[App Init] update HistoriqueAvenant', props<HistoriqueAvenant>());
export const deleteHistoriqueAvenant = createAction('[App Init] delete HistoriqueAvenant', props<HistoriqueAvenant>());
export const loadHistoriqueAvenant = createAction('[App Init] load HistoriqueAvenant', props<{policeId: string}>());
export const setHistoriqueAvenant = createAction('[App Init] set HistoriqueAvenant',  props<HistoriqueAvenantList>());
export const loadHistoriquePlafondGroupe = createAction('[App Init] load HistoriquePlafondGroupe',
	props<{avanantId: string, grpId: string}>());
export const loadHistoriquePlafondFamilleActe = createAction('[App Init] load HistoriquePlafondFamilleActe',
	props<{avanantId: string, grpId: string}>());
export const loadHistoriquePlafondActe = createAction('[App Init] load HistoriquePlafondActe',
	props<{avanantId: string, grpId: string}>());
export const loadHistoriquePlafondSousActe = createAction('[App Init] load HistoriquePlafondSousActe',
	props<{avanantId: string, grpId: string}>());
