import { createAction, props } from '@ngrx/store';
import { Report } from '../../medical/ordonnance-medical/model';
import { Operation, OperationList } from './model';
export const createOperation = createAction('[App Init] Create Operation', props<Operation>());
export const updateOperation = createAction('[App Init] update Operation', props<Operation>());
export const deleteOperation = createAction('[App Init] delete Operation', props<Operation>());
export const loadOperation = createAction('[App Init] load Operation');
export const setOperation = createAction('[App Init] set Operation',  props<OperationList>());
export const loadOperationByExerciceOperation = createAction('[App Init] load Operation By Exercice', props<{exerciceOperationId: string}>());
export const findOperationCaisseJournalier = createAction('[App Init] update Operation journaliere', props<Operation>());
export const FetchReport = createAction('[Report] Fetch Report arrete', props<Report>());
export const setReportArrete = createAction('[set Report] set Report Arreter', props<{reportFile: ArrayBuffer}>());
export const findOperationGrandLivre = createAction('[App Init] update Operation grand livre', props<Operation>());




