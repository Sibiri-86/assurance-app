import {props, createAction} from '@ngrx/store';
import { Medecin, MedecinList } from './model';
export const createMedecin = createAction('[App Init] Create Medecin', props<Medecin>());
export const updateMedecin = createAction('[App Init] update Medecin', props<Medecin>());
export const deleteMedecin = createAction('[App Init] delete Medecin', props<Medecin>());
export const loadMedecin = createAction('[App Init] load Medecin');
export const setMedecin = createAction('[App Init] set Medecin',  props<MedecinList>());
export const importMedecin = createAction('[App Init] import Medecin',  props<{file: File}>());