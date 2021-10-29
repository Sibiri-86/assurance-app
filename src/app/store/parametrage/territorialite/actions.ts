import {props, createAction} from '@ngrx/store';
import { Territorialite, TerritorialiteList } from './model';
export const createTerritorialite = createAction('[App Init] Create Territorialite', props<Territorialite>());
export const updateTerritorialite = createAction('[App Init] update Territorialite', props<Territorialite>());
export const deleteTerritorialite = createAction('[App Init] delete Territorialite', props<Territorialite>());
export const loadTerritorialite = createAction('[App Init] load Territorialite');
export const setTerritorialite = createAction('[App Init] set Territorialite',  props<TerritorialiteList>());
export const importTerritorialite = createAction('[App Init] import Territorialite',  props<{file: File}>());