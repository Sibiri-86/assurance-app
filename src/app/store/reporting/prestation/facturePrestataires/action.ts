import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';


/* export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif'); */
export const FetchReportFacturePrestataires = createAction('[Report] Fetch Report FacturePrestataires', props<Report>());
export const setReportFacturePrestataires = createAction('[set Report] set Report FacturePrestataires', props<{reportFile: ArrayBuffer}>());







