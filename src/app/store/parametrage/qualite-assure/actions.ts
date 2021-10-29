import {props, createAction} from '@ngrx/store';
import { QualiteAssure, QualiteAssureList } from './model';
export const createQualiteAssure = createAction('[App Init] Create QualiteAssure', props<QualiteAssure>());
export const updateQualiteAssure = createAction('[App Init] update QualiteAssure', props<QualiteAssure>());
export const deleteQualiteAssure = createAction('[App Init] delete QualiteAssure', props<QualiteAssure>());
export const loadQualiteAssure = createAction('[App Init] load QualiteAssure');
export const setQualiteAssure = createAction('[App Init] set QualiteAssure',  props<QualiteAssureList>());
export const importQualiteAssure = createAction('[App Init] import QualiteAssure',  props<{file: File}>());