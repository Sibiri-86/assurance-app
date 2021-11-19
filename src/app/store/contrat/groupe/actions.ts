import {props, createAction} from '@ngrx/store';
import { Groupe, GroupeList } from './model';
export const createGroupe = createAction('[App Init] Create Groupe', props<Groupe>());
export const updateGroupe = createAction('[App Init] update Groupe', props<Groupe>());
export const deleteGroupe = createAction('[App Init] delete Groupe', props<Groupe>());
export const deleteGroupes = createAction('[App Init] delete Groupes', props<{groupeList: Array<Groupe>}>());
export const loadGroupe = createAction('[App Init] load Groupe', props<{policeId: string}>());
export const setGroupe = createAction('[App Init] set Groupe',  props<GroupeList>());
export const importGroupe = createAction('[App Init] import Groupe',  props<{file: File}>());
