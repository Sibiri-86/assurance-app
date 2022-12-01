import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';


/* export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif'); */
export const FetchReportConsommationParSexe = createAction('[Report] Fetch Report ConsommationParSexe', props<Report>());
export const setReportConsommationParSexe = createAction('[set Report] set Report ConsommationParSexe', props<{reportFile: ArrayBuffer}>());







