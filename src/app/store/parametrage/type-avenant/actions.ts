import {props, createAction} from '@ngrx/store';
import { TypeAvenant, TypeAvenantList } from './model';
export const createTypeAvenant = createAction('[App Init] Create TypeAvenant', props<TypeAvenant>());
export const updateTypeAvenant = createAction('[App Init] update TypeAvenant', props<TypeAvenant>());
export const deleteTypeAvenant = createAction('[App Init] delete TypeAvenant', props<TypeAvenant>());
export const loadTypeAvenant = createAction('[App Init] load TypeAvenant');
export const setTypeAvenant = createAction('[App Init] set TypeAvenant',  props<TypeAvenantList>());
export const importTypeAvenant = createAction('[App Init] import TypeAvenant',  props<{file: File}>());