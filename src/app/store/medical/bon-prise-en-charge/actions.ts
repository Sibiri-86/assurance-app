import {props, createAction} from '@ngrx/store';
import { BonPriseEnCharge, BonPriseEnChargeList } from './model';
export const createBon = createAction('[App Init] Bon Prise en charge', props<BonPriseEnCharge>());
export const updateBon = createAction('[App Init] update Bon Prise en charge', props<BonPriseEnCharge>());
export const deleteBon = createAction('[App Init] delete Bon Prise en charge', props<BonPriseEnCharge>());
export const loadBon = createAction('[App Init] load Bon Prise en charge');
export const setBon = createAction('[App Init] set Bon Prise en charge',  props<BonPriseEnChargeList>());
export const importBon = createAction('[App Init] import Bon Prise en charge',  props<{file: File}>());