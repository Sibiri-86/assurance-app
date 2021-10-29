import {props, createAction} from '@ngrx/store';
import { SecteurActivite, SecteurActiviteList } from './model';
export const createSecteurActivite = createAction('[App Init] Create secteur activite', props<SecteurActivite>());
export const updateSecteurActivite = createAction('[App Init] update secteur activite', props<SecteurActivite>());
export const deleteSecteurActivite = createAction('[App Init] delete secteur activite', props<SecteurActivite>());
export const loadSecteurActivite = createAction('[App Init] load secteur activite');
export const setSecteurActivite = createAction('[App Init] set secteur activite',  props<SecteurActiviteList>());
export const importSecteurActivite = createAction('[App Init] import secteur activite',  props<{file: File}>());