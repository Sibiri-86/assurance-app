import {props, createAction} from '@ngrx/store';
import { OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutiqueList, Report } from './model';

export const createOrdonnance = createAction('[App Init] ordonnance medical', props<OrdonnanceMedical>());
export const loadOrdonnance = createAction('[App Init] load ordonnance medical');
export const setOrdonnance = createAction('[App Init] set ordonnance medical',  props<OrdonnanceMedicalProduitPharmaceutiqueList>());
export const setReportOrdonnance = createAction('[set Report] set Report ordonnance medical', props<{reportFile: ArrayBuffer}>());
export const FetchReportOrdonnance = createAction('[Report] Fetch Report ordonnance medical', props<Report>());

