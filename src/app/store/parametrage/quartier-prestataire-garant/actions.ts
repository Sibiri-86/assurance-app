import {props, createAction} from '@ngrx/store';
import { SousActe } from '../sous-acte/model';
import { QuartierPrestataireGarant, QuartierPrestataireGarantList } from './model';
export const createQuartierPrestataire = createAction('[App Init] Create Quartier Prestataire', props<QuartierPrestataireGarant>());
export const updateQuartierPrestataire = createAction('[App Init] update Quartier Prestataire', props<QuartierPrestataireGarant>());
export const deleteQuartierPrestataire = createAction('[App Init] delete Quartier Prestataire', props<QuartierPrestataireGarant>());
export const loadQuartierPrestataire = createAction('[App Init] load quartier Prestataire',  props<{quartierId: string, garantId: string}>());
export const loadQuartierPrestataires = createAction('[App Init] loads Quartier Prestataires');
export const setQuartierPrestataire = createAction('[App Init] set Quartier Prestataire',  props<QuartierPrestataireGarantList>());
export const importQuartierPrestataire = createAction('[App Init] import Quartier Prestataire',  props<{file: File}>());

