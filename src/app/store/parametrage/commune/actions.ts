import {props, createAction} from '@ngrx/store';
import { Commune, CommuneList } from './model';
export const createCommune = createAction('[App Init] Create Commune', props<Commune>());
export const updateCommune = createAction('[App Init] update Commune', props<Commune>());
export const deleteCommune = createAction('[App Init] delete Commune', props<Commune>());
export const loadCommune = createAction('[App Init] load Commune');
export const setCommune = createAction('[App Init] set Commune',  props<CommuneList>());
export const importCommune = createAction('[App Init] import Commune',  props<{file: File}>());