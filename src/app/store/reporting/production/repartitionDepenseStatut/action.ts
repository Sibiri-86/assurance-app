import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { RecapitulatifList } from './model';


/* export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif'); */
export const FetchReportRepartitionDepenseStatut = createAction('[Report] Fetch Report RepartitionDepenseStatut', props<Report>());
export const setReportRepartitionDepenseStatut = createAction('[set Report] set Report RepartitionDepenseStatut', props<{reportFile: ArrayBuffer}>());







