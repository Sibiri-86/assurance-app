import {props, createAction} from '@ngrx/store';
import { Secteur, SecteurList } from './model';
export const createSecteur = createAction('[App Init] Create Secteur', props<Secteur>());
export const updateSecteur = createAction('[App Init] update Secteur', props<Secteur>());
export const deleteSecteur = createAction('[App Init] delete Secteur', props<Secteur>());
export const loadSecteur = createAction('[App Init] load Secteur');
export const setSecteur = createAction('[App Init] set Secteur',  props<SecteurList>());
export const importSecteur = createAction('[App Init] import Secteur',  props<{file: File}>());