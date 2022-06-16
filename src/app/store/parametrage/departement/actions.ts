import {props, createAction} from '@ngrx/store';
import { Departement, DepartementList } from './model';
export const createDepartement = createAction('[App Init] Create Departement', props<Departement>());
export const updateDepartement = createAction('[App Init] update Departement', props<Departement>());
export const deleteDepartement = createAction('[App Init] delete Departement', props<Departement>());
export const loadDepartement = createAction('[App Init] load Departement');
export const setDepartement = createAction('[App Init] set Departement',  props<DepartementList>());
export const importDepartement = createAction('[App Init] import Departement',  props<{file: File}>());