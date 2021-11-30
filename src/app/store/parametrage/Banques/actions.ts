import {props, createAction} from '@ngrx/store';
import { Banque, BanqueList } from './model';
export const createBanque = createAction('[App Init] Create Banque', props<Banque>());
export const updateBanque = createAction('[App Init] update Banque', props<Banque>());
export const deleteBanque = createAction('[App Init] delete Banque', props<Banque>());
export const loadBanque = createAction('[App Init] load Banque');
export const setBanque = createAction('[App Init] set Banque',  props<BanqueList>());
export const importBanque = createAction('[App Init] import Banque',  props<{file: File}>());