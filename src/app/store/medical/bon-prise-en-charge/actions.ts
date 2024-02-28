import {props, createAction} from '@ngrx/store';
import { BonPriseEnCharge, BonPriseEnChargeList, Report } from './model';
export const createBon = createAction('[App Init] Bon Prise en charge', props<{bon: BonPriseEnCharge, dateD: string,
    dateF: string}>());
export const updateBon = createAction('[App Init] update Bon Prise en charge', props<BonPriseEnCharge>());
export const deleteBon = createAction('[App Init] delete Bon Prise en charge', props<{bon: BonPriseEnCharge, dateD: string,
    dateF: string}>());
export const loadBon = createAction('[App Init] load Bon Prise en charge');
export const loadBons = createAction('[App Init] loadBons Bon Prise en charge');
export const loadBonsByAdherent = createAction('[App Init] loadBons Bon Prise en charge by adherent',
props<{adherentId: string}>());
export const setBon = createAction('[App Init] set Bon Prise en charge',  props<BonPriseEnChargeList>());
export const importBon = createAction('[App Init] import Bon Prise en charge',  props<{file: File}>());
export const setReportBon = createAction('[set Report] set Report Bon', props<{reportFile: ArrayBuffer}>());
export const FetchReportBon = createAction('[Report] Fetch Report Bon', props<Report>());
export const valideBon = createAction('[App Init] Bon Prise en charge valide', props<BonPriseEnCharge>());
export const invalideBon = createAction('[App Init] Bon Prise en charge invalide', props<BonPriseEnCharge>());
export const loadBonPriseEnChargePeriode = createAction('[App Init] load BonPriseEnCharge by periode', props<{dateD: string,
    dateF: string}>() );
