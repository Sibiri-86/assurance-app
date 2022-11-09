import { createAction, props } from '@ngrx/store';
import { Report } from '../../contrat/police/model';
import { Check, DepenseFamilleList } from './model';


export const setDepenseFamille = createAction('[App Init] set DepenseFamille',  props<DepenseFamilleList>());
export const loadDepenseFamille = createAction('[App Init] load DepenseFamille');
export const FetchReportDepenseFamille = createAction('[Report] Fetch Report DepenseFamille', props<Report>());
export const setReportDepenseFamille = createAction('[set Report] set Report DepenseFamille', props<{reportFile: ArrayBuffer}>());
export const updateDepenseFamille = createAction('[App Init] update Depense Famille',props<Check>());







