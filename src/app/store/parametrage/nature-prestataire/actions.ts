import {props, createAction} from '@ngrx/store';
import { NaturePrestataire, NaturePrestataireList } from './model';
export const createNaturePrestataire = createAction('[App Init] Create NaturePrestataire', props<NaturePrestataire>());
export const updateNaturePrestataire = createAction('[App Init] update NaturePrestataire', props<NaturePrestataire>());
export const deleteNaturePrestataire = createAction('[App Init] delete NaturePrestataire', props<NaturePrestataire>());
export const loadNaturePrestataire = createAction('[App Init] load NaturePrestataire');
export const setNaturePrestataire = createAction('[App Init] set NaturePrestataire',  props<NaturePrestataireList>());
export const importNaturePrestataire = createAction('[App Init] import NaturePrestataire',  props<{file: File}>());