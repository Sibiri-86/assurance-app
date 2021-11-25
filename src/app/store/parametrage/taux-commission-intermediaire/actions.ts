import {props, createAction} from '@ngrx/store';
import { TauxCommissionIntermediaire, TauxCommissionIntermediaireList } from './model';
export const createTauxCommissionIntermediaire = createAction('[App Init] Create TauxCommissionIntermediaire', props<TauxCommissionIntermediaire>());
export const updateTauxCommissionIntermediaire = createAction('[App Init] update TauxCommissionIntermediaire', props<TauxCommissionIntermediaire>());
export const deleteTauxCommissionIntermediaire = createAction('[App Init] delete TauxCommissionIntermediaire', props<TauxCommissionIntermediaire>());
export const loadTauxCommissionIntermediaire = createAction('[App Init] load TauxCommissionIntermediaire');
export const setTauxCommissionIntermediaire = createAction('[App Init] set TauxCommissionIntermediaire',  props<TauxCommissionIntermediaireList>());
export const importTauxCommissionIntermediaire = createAction('[App Init] import TauxCommissionIntermediaire',  props<{file: File}>());