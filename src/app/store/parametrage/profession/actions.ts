import {props, createAction} from '@ngrx/store';
import { Profession, ProfessionList } from './model';
export const createProfession = createAction('[App Init] Create Profession', props<Profession>());
export const updateProfession = createAction('[App Init] update Profession', props<Profession>());
export const deleteProfession = createAction('[App Init] delete Profession', props<Profession>());
export const loadProfession = createAction('[App Init] load Profession');
export const setProfession = createAction('[App Init] set Profession',  props<ProfessionList>());
export const importProfession = createAction('[App Init] import Profession',  props<{file: File}>());