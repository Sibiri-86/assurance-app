import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { RecapitulatifList } from './model';


/* export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif'); */
export const FetchReportRecapitulatif = createAction('[Report] Fetch Report Recapitulatif', props<Report>());
export const setReportRecapitulatif = createAction('[set Report] set Report Recapitulatif', props<{reportFile: ArrayBuffer}>());







