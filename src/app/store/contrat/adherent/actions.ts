import {props, createAction} from '@ngrx/store';
import { Adherent, AdherentList } from './model';
export const createAdherent = createAction('[App Init] Create Adherent', props<Adherent>());
export const updateAdherent = createAction('[App Init] update Adherent', props<Adherent>());
export const deleteAdherent = createAction('[App Init] delete Adherent', props<Adherent>());
export const deleteAdherents = createAction('[App Init] delete Adherents', props<{adherentList:Array<Adherent>}>());
export const loadAdherent = createAction('[App Init] load Adherent', props<{idGroupe:string}>());
export const setAdherent = createAction('[App Init] set Adherent',  props<AdherentList>());
export const importAdherent = createAction('[App Init] import Adherent',  props<{file: File}>());