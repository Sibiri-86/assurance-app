import {props, createAction} from '@ngrx/store';
import { OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique } from './model';
// import { BonPriseEnCharge, BonPriseEnChargeList, Report } from './model';
export const createOrdonnance = createAction('[App Init] ordonnance medical', props<OrdonnanceMedical>());
export const loadOrdonnance = createAction('[App Init] load ordonnance medical');
/* export const updateBon = createAction('[App Init] update Bon Prise en charge', props<BonPriseEnCharge>());
export const deleteBon = createAction('[App Init] delete Bon Prise en charge', props<BonPriseEnCharge>());
export const setBon = createAction('[App Init] set Bon Prise en charge',  props<BonPriseEnChargeList>());
export const importBon = createAction('[App Init] import Bon Prise en charge',  props<{file: File}>());
export const setReportBon = createAction('[set Report] set Report Bon', props<{reportFile: ArrayBuffer}>());
export const FetchReportBon = createAction('[Report] Fetch Report Bon', props<Report>()); */
