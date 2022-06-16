import {props, createAction} from '@ngrx/store';
import { QualiteMedecin, QualiteMedecinList } from './model';
export const createQualiteMedecin = createAction('[App Init] Create QualiteMedecin', props<QualiteMedecin>());
export const updateQualiteMedecin = createAction('[App Init] update QualiteMedecin', props<QualiteMedecin>());
export const deleteQualiteMedecin = createAction('[App Init] delete QualiteMedecin', props<QualiteMedecin>());
export const loadQualiteMedecin = createAction('[App Init] load QualiteMedecin');
export const setQualiteMedecin = createAction('[App Init] set QualiteMedecin',  props<QualiteMedecinList>());
export const importQualiteMedecin = createAction('[App Init] import QualiteMedecin',  props<{file: File}>());