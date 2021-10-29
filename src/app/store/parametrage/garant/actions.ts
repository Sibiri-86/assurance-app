import {props, createAction} from '@ngrx/store';
import { Garant, GarantList } from './model';
export const createGarant = createAction('[App Init] Create type Garant', props<Garant>());
export const updateGarant = createAction('[App Init] update type Garant', props<Garant>());
export const deleteGarant = createAction('[App Init] delete type Garant', props<Garant>());
export const loadGarant = createAction('[App Init] load type Garant');
export const setGarant = createAction('[App Init] set  type Garant',  props<GarantList>());
export const importGarant = createAction('[App Init] import type Garant',  props<{file: File}>());