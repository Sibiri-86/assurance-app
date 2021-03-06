import {props, createAction} from '@ngrx/store';
import { Rapport, Report } from './model';
import { Police, PoliceList, Statistique } from './model';
export const createPolice = createAction('[App Init] Create Police', props<Police>());
export const updatePolice = createAction('[App Init] update Police', props<Police>());
export const validerPolice = createAction('[App Init] valider Police', props<Police>());
export const cloturePolice = createAction('[App Init] cloture Police', props<Police>());
export const deletePolice = createAction('[App Init] delete Police', props<Police>());
export const deletePolices = createAction('[App Init] delete Polices', props<{PoliceList:Array<Police>}>());
export const loadPolice = createAction('[App Init] load Police');
export const loadPoliceAll = createAction('[App Init] load Police all');
export const loadStatistique = createAction('[App Init] load Statistique');
export const loadRapport = createAction('[App Init] load Rapport', props<Police>());
export const setStatistique = createAction('[App Init] set Statistique', props<Statistique>());
export const setRapport = createAction('[App Init] set Rapport Statistique', props<Rapport>());
export const setPolice = createAction('[App Init] set Police',  props<PoliceList>());
export const importPolice = createAction('[App Init] import Police',  props<{file: File}>());
export const FetchReport = createAction('[Report] Fetch Report', props<Report>());
export const setReport = createAction('[set Report] set Report', props<{reportFile: ArrayBuffer}>());
export const loadPoliceByAffaireNouvelle = createAction('[load Police] load PoliceByAffaireNouvelle');
export const deValiderPolice = createAction('[App Init] deValider Police', props<Police>());
export const getActiveExerciceByPolice = createAction('[App Init] get active exercice', props<{policeId: string}>());


