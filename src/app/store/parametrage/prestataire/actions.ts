import {props, createAction} from '@ngrx/store';
import { Prestataire, PrestataireList } from './model';
export const createPrestataire = createAction('[App Init] Create Prestataire', props<Prestataire>());
export const updatePrestataire = createAction('[App Init] update Prestataire', props<Prestataire>());
export const deletePrestataire = createAction('[App Init] delete Prestataire', props<Prestataire>());
export const loadPrestataire = createAction('[App Init] load Prestataire');
export const setPrestataire = createAction('[App Init] set Prestataire',  props<PrestataireList>());
export const importPrestataire = createAction('[App Init] import Prestataire',  props<{file: File}>());