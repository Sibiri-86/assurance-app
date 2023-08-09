import { createAction, props } from '@ngrx/store';
import { Report } from '../../contrat/police/model';
import { Bilan, Check, DepenseFamilleList } from './model';
import { ExerciceComptable } from '../../comptabilite/exercice-comptable/model';


export const setDepenseFamille = createAction('[App Init] set DepenseFamille',  props<DepenseFamilleList>());
export const loadDepenseFamille = createAction('[App Init] load DepenseFamille');
export const FetchReportDepenseFamille = createAction('[Report] Fetch Report DepenseFamille', props<Report>());
export const setReportDepenseFamille = createAction('[set Report] set Report DepenseFamille', props<{reportFile: ArrayBuffer}>());
export const updateDepenseFamille = createAction('[App Init] update Depense Famille',props<Check>());
export const updateDepenseFamilleActe = createAction('[App Init] update Depense Famille acte',props<Check>());
export const FetchReportBilan = createAction('[Report] Fetch Report Bilan', props<ExerciceComptable>());








