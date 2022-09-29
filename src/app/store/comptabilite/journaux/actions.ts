import { createAction, props } from '@ngrx/store';
import { Report } from '../../contrat/police/model';
import { Journaux, JournauxList } from './model';
export const createJournaux = createAction('[App Init] Create Journaux', props<Journaux>());
export const updateJournaux = createAction('[App Init] update Journaux', props<Journaux>());
export const deleteJournaux = createAction('[App Init] delete Journaux', props<Journaux>());
export const loadJournaux = createAction('[App Init] load Journaux');
export const setJournaux = createAction('[App Init] set Journaux',  props<JournauxList>());
export const importJournaux = createAction('[App Init] import Journaux',  props<{file: File}>());
export const FetchReportBalanceHuit = createAction('[Report] Fetch Report balance huit', props<Report>());
export const setReportBalanceHuit = createAction('[set Report] set Report balance huit', props<{reportFile: ArrayBuffer}>());

