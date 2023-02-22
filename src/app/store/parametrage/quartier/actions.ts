import {props, createAction} from '@ngrx/store';
import { SousActe } from '../sous-acte/model';
import { Quartier, QuartierList } from './model';
export const createQuartier = createAction('[App Init] Create Quartier', props<Quartier>());
export const updateQuartier = createAction('[App Init] update Quartier', props<Quartier>());
export const deleteQuartier = createAction('[App Init] delete Quartier', props<Quartier>());
export const loadQuartier = createAction('[App Init] load quartier');
export const loadQuartiers = createAction('[App Init] loads Quartiers');
export const setQuartier = createAction('[App Init] set Quartier',  props<QuartierList>());
export const importQuartier = createAction('[App Init] import Quartier',  props<{file: File}>());

