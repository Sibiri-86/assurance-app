import {props, createAction} from '@ngrx/store';
import { Arrondissement, ArrondissementList } from './model';
export const createArrondissement = createAction('[App Init] Create Arrondissement', props<Arrondissement>());
export const updateArrondissement = createAction('[App Init] update Arrondissement', props<Arrondissement>());
export const deleteArrondissement = createAction('[App Init] delete Arrondissement', props<Arrondissement>());
export const loadArrondissement = createAction('[App Init] load Arrondissement');
export const setArrondissement = createAction('[App Init] set Arrondissement',  props<ArrondissementList>());
export const importArrondissement = createAction('[App Init] import Arrondissement',  props<{file: File}>());