import {props, createAction} from '@ngrx/store';
import { Pathologie, PathologieList } from './model';
export const createPathologie = createAction('[App Init] Create Pathologie', props<Pathologie>());
export const updatePathologie = createAction('[App Init] update Pathologie', props<Pathologie>());
export const deletePathologie = createAction('[App Init] delete Pathologie', props<Pathologie>());
export const loadPathologie = createAction('[App Init] load Pathologie');
export const setPathologie = createAction('[App Init] set Pathologie',  props<PathologieList>());
export const importPathologie = createAction('[App Init] import Pathologie',  props<{file: File}>());