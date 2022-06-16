import {props, createAction} from '@ngrx/store';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../parametrage/plafond/model';
import { Groupe } from '../groupe/model';
import {Bareme, BaremeList, Plafond, PlafondConfig, PlafondGroupe, PlafondGroupeFamilleActeListe, PlafondList} from './model';
import {Adherent} from '../adherent/model';

export const createPlafond = createAction('[App Init] Create Plafond', props<Plafond>());
export const updatePlafond = createAction('[App Init] update Plafond', props<Plafond>());
export const deletePlafond = createAction('[App Init] delete Plafond', props<Plafond>());
export const deletePlafonds = createAction('[App Init] delete Plafonds', props<{plafondList:Array<Plafond>}>());
export const loadPlafond = createAction('[App Init] load Plafond');
export const setPlafond = createAction('[App Init] set Plafond',  props<PlafondList>());
export const loadPlafondGroupe = createAction('[App Init] load Plafond Groupe',props<Groupe>());
export const setPlafondGroupe = createAction('[App Init] set Plafond Groupe',  props<Plafond>());
export const importPlafond = createAction('[App Init] import Plafond',  props<{file: File}>());
export const loadPlafondConfig = createAction('[App Init] load Plafond config', props<{typeBareme: string, taux: number}>());
export const setPlafondConfig = createAction('[App Init] set Plafond config',  props<PlafondConfig>());
/**action pour creer le bareme */
export const createBareme = createAction('[App Init] Create Bareme', props<Bareme>());
export const updateBareme = createAction('[App Init] update Bareme', props<Bareme>());
export const deleteBareme = createAction('[App Init] delete Bareme', props<Bareme>());
export const loadBareme = createAction('[App Init] load Bareme');
export const setBareme = createAction('[App Init] set bareme',  props<BaremeList>());
/**pour recuperer la configuration du bareme */
export const loadBaremeConfig = createAction('[App Init] load Bareme',  props<{typeBareme: string, taux: number}>());
export const loadFamilleActeEnCours = createAction('[App Init] load Famille Acte en Cours',
    props<{numero: number}>());
export const setPlafondGroupeFamilleActe = createAction('[App Init] set Plafond Groupe Famille Acte',
    props<{plafondEnCours: Array<PlafondFamilleActe>}>());
export const loadActeEnCours = createAction('[App Init] load Acte en Cours',
    props<{idPGFA: string}>());
export const setPlafondGroupeActe = createAction('[App Init] set Plafond Groupe Acte',
    props<{plafondActeEnCours: Array<PlafondActe>}>());

export const loadSousActeEnCours = createAction('[App Init] load Sous Acte en Cours',
    props<{idPGA: string}>());
export const setPlafondGroupeSousActe = createAction('[App Init] set Plafond Groupe Sous Acte',
    props<{plafondSousActeEnCours: Array<PlafondSousActe>}>());
