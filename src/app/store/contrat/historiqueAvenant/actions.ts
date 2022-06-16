import {props, createAction} from '@ngrx/store';
import {HistoriqueAvenant, HistoriqueAvenantList, VerifyRenouvellementIsOverlapReponse} from './model';
import {Police} from '../police/model';
export const createHistoriqueAvenant = createAction('[App Init] Create HistoriqueAvenant', props<HistoriqueAvenant>());
export const updateHistoriqueAvenant = createAction('[App Init] update HistoriqueAvenant', props<HistoriqueAvenant>());
export const deleteHistoriqueAvenant = createAction('[App Init] delete HistoriqueAvenant', props<HistoriqueAvenant>());
export const loadHistoriqueAvenant = createAction('[App Init] load HistoriqueAvenant', props<{policeId: string}>());
export const setHistoriqueAvenant = createAction('[App Init] set HistoriqueAvenant',  props<{historiqueAvenantList: HistoriqueAvenantList}>());
export const loadHistoriquePlafondGroupe = createAction('[App Init] load HistoriquePlafondGroupe',
	props<{avanantId: string, grpId: string}>());
export const loadHistoriquePlafondFamilleActe = createAction('[App Init] load HistoriquePlafondFamilleActe',
	props<{avanantId: string, grpId: string}>());
export const loadHistoriquePlafondActe = createAction('[App Init] load HistoriquePlafondActe',
	props<{avanantId: string, grpId: string}>());
export const loadHistoriquePlafondSousActe = createAction('[App Init] load HistoriquePlafondSousActe',
	props<{avanantId: string, grpId: string}>());
export const createHistoriqueAvenantFile = createAction('[App Init] Create HistoriqueAvenant With File',
	props<{historiqueAvenant: HistoriqueAvenant, file: File}>());
export const setHistoriqueAvenantWithoutActive = createAction('[App Init] set HistoriqueAvenant without active',
	props<{historiqueAvenantListWithoutActive: HistoriqueAvenant[]}>());
export const loadHistoriquePlafondActeWithoutActive = createAction('[App Init] load HistoriquePlafondActe without active',
	props<{policeId: string}>());
export const loadHistoriqueAvenantByExercice = createAction('[App Init] load HistoriqueAvenant by exercice',
	props<{exerciceId: string}>());
export const setHistoriqueAvenantByExercice = createAction('[App Init] set HistoriqueAvenant by exercice',
	props<{historiqueAvenantListByExercie: HistoriqueAvenant[]}>());
export const verifierRenouvellementNonChevauche = createAction('[App Init] verifier si renouvellement ne chevauche pas',
  props<{debut: Date, typeDuree: string, duree: number, policeId: string}>());
export const verifyRenouvellementIsOverlap = createAction('[App Init] selected for verify if renouvellement is overlap',
	props<VerifyRenouvellementIsOverlapReponse>());
/*
export const misAJours = createAction('[App Init] mis a jours HistoriqueAvenant', props<HistoriqueAvenant>());
*/

