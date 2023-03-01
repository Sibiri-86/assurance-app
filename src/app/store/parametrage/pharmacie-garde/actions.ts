import {props, createAction} from '@ngrx/store';
import {PharmacieGarde, PharmacieGardeList } from './model';
export const createPharmacieGarde = createAction('[App Init] Create PharmacieGarde', props<PharmacieGarde>());
export const updatePharmacieGarde = createAction('[App Init] update PharmacieGarde', props<PharmacieGarde>());
export const deletePharmacieGarde = createAction('[App Init] delete PharmacieGarde', props<PharmacieGarde>());
export const loadPharmacieGarde = createAction('[App Init] load PharmacieGarde');
export const setPharmacieGarde = createAction('[App Init] set PharmacieGarde',  props<PharmacieGardeList>());
export const importPharmacieGarde = createAction('[App Init] import PharmacieGarde',  props<{file: File}>());
