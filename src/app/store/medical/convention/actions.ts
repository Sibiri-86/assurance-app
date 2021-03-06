import {props, createAction} from '@ngrx/store';
import { Convention, ConventionList } from './model';
export const createConvention = createAction('[App Init] create convention', props<Convention>());
export const updateConvention = createAction('[App Init] update Convention', props<Convention>());
export const deleteConvention = createAction('[App Init] delete convention', props<Convention>());
export const loadConvention = createAction('[App Init] load Convention');
export const setConvention = createAction('[App Init] set Convention',  props<ConventionList>());