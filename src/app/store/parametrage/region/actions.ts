import {props, createAction} from '@ngrx/store';
import { Region, RegionList } from './model';
export const createRegion = createAction('[App Init] Create Region', props<Region>());
export const updateRegion = createAction('[App Init] update Region', props<Region>());
export const deleteRegion = createAction('[App Init] delete Region', props<Region>());
export const loadRegion = createAction('[App Init] load Region');
export const setRegion = createAction('[App Init] set Region',  props<RegionList>());
export const importRegion = createAction('[App Init] import Region',  props<{file: File}>());