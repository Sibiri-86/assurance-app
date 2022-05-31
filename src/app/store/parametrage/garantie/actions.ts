import {props, createAction} from '@ngrx/store';
import { Garantie, GarantieList } from './model';
export const createGarantie = createAction('[App Init] Create garantie', props<Garantie>());
export const updateGarantie = createAction('[App Init] update garantie', props<Garantie>());
export const deleteGarantie = createAction('[App Init] delete garantie', props<Garantie>());
export const loadGarantie = createAction('[App Init] load garantie');
export const loadGaranties = createAction('[App Init] load garanties');
export const setGarantie = createAction('[App Init] set garantie',  props<GarantieList>());
export const importGarantie = createAction('[App Init] import garantie',  props<{file: File}>());

