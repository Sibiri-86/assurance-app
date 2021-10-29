import {props, createAction} from '@ngrx/store';
import { ModePaiement, ModePaiementList } from './model';
export const createModePaiement = createAction('[App Init] Create ModePaiement', props<ModePaiement>());
export const updateModePaiement = createAction('[App Init] update ModePaiement', props<ModePaiement>());
export const deleteModePaiement = createAction('[App Init] delete ModePaiement', props<ModePaiement>());
export const loadModePaiement = createAction('[App Init] load ModePaiement');
export const setModePaiement = createAction('[App Init] set ModePaiement',  props<ModePaiementList>());
export const importModePaiement = createAction('[App Init] import ModePaiement',  props<{file: File}>());