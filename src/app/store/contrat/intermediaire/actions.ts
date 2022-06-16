import {props, createAction} from '@ngrx/store';
import { Intermediaire, IntermediaireList } from './model';
export const createIntermediaire = createAction('[App Init] Create Intermediaire', props<Intermediaire>());
export const updateIntermediaire = createAction('[App Init] update Intermediaire', props<Intermediaire>());
export const deleteIntermediaire = createAction('[App Init] delete Intermediaire', props<Intermediaire>());
export const loadIntermediaire = createAction('[App Init] load Intermediaire');
export const setIntermediaire = createAction('[App Init] set Intermediaire',  props<IntermediaireList>());
export const deleteIntermediaires = createAction('[App Init] delete intermediaires', props<{intermediaireList:Array<Intermediaire>}>());
export const importIntermediaire = createAction('[App Init] import Intermediaire',  props<{file: File}>());