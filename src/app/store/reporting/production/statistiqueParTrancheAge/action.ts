import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';


/* export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif'); */
export const FetchReportStatistiqueParTrancheAge = createAction('[Report] Fetch Report StatistiqueParTrancheAge', props<Report>());
export const setReportStatistiqueParTrancheAge = createAction('[set Report] set Report StatistiqueParTrancheAge', props<{reportFile: ArrayBuffer}>());
export const FetchConsommationParFamille = createAction('[Report] Fetch Report ConsommationParFamille', props<Report>());
export const setReportConsommationParFamille = createAction('[set Report] set Report ConsommationParFamille', props<{reportFile: ArrayBuffer}>());






