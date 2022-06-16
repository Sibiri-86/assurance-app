import {props, createAction} from '@ngrx/store';
import { DimensionPeriode, DimensionPeriodeList } from './model';
export const createDimensionPeriode = createAction('[App Init] Create DimensionPeriode', props<DimensionPeriode>());
export const updateDimensionPeriode = createAction('[App Init] update DimensionPeriode', props<DimensionPeriode>());
export const deleteDimensionPeriode = createAction('[App Init] delete DimensionPeriode', props<DimensionPeriode>());
export const loadDimensionPeriode = createAction('[App Init] load DimensionPeriode');
export const setDimensionPeriode = createAction('[App Init] set DimensionPeriode',  props<DimensionPeriodeList>());
export const importDimensionPeriode = createAction('[App Init] import DimensionPeriode',  props<{file: File}>());