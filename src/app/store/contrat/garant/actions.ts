import {props, createAction} from '@ngrx/store';
import { Garant, GarantList } from './model';
export const createGarant = createAction('[App Init] Create Garant', props<Garant>());
export const updateGarant = createAction('[App Init] update Garant', props<Garant>());
export const deleteGarant = createAction('[App Init] delete Garant', props<Garant>());
export const deleteGarants = createAction('[App Init] delete Garants', props<GarantList>());
export const loadGarant = createAction('[App Init] load Garant');
export const setGarant = createAction('[App Init] set Garant',  props<GarantList>());
export const importGarant = createAction('[App Init] import Garant',  props<{file: File}>());