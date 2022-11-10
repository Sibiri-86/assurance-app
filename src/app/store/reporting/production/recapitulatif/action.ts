import { createAction, props } from '@ngrx/store';
import { RecapitulatifList } from './model';


export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif');
/* export const FetchReportDepenseFamille = createAction('[Report] Fetch Report DepenseFamille', props<Report>());
export const setReportDepenseFamille = createAction('[set Report] set Report DepenseFamille', props<{reportFile: ArrayBuffer}>());
export const updateDepenseFamille = createAction('[App Init] update Depense Famille',
    props<Check>()); */







