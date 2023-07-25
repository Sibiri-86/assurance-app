import {props, createAction} from '@ngrx/store';
import { AdherentFamille, AdherentResearchReponse, ConditionGenerale, ConditionGeneraleList } from './model';
import { Adherent, AdherentList } from './model';
export const createAdherent = createAction('[App Init] Create Adherent', props<Adherent>());
export const updateAdherent = createAction('[App Init] update Adherent', props<Adherent>());
export const deleteAdherent = createAction('[App Init] delete Adherent', props<Adherent>());
export const deleteAdherents = createAction('[App Init] delete Adherents', props<{adherentList: Array<Adherent>}>());
export const loadAdherent = createAction('[App Init] load Adherent', props<{idGroupe: string}>());
export const loadAdherentAll = createAction('[App Init] load Adherent all', props<{idGarantie: string, idPolice: string}>());
export const loadAdherentDistinct = createAction('[App Init] load Adherent distinct', props<{idGarantie: string, idPolice: string}>());
export const loadAdherentDistinctGroupe = createAction('[App Init] load Adherent distinct by groupe', props<{idGarantie: string, idPolice: string, idGroupe: string}>());
export const loadAdherentGroupe = createAction('[App Init] load Adherent', props<{idGroupe: string}>());
export const loadAdherentGroupeAndExercice = createAction('[App Init] load Adherent', props<{idGroupe: string, idExercice: string}>());
export const setAdherent = createAction('[App Init] set Adherent',  props<AdherentList>());
export const importAdherent = createAction('[App Init] import Adherent',  props<{file: File}>());
export const searchAdherent = createAction('[App Init] search Adherent',  props<{numero: number}>());
export const searchAdherentByNom = createAction('[App Init] searchs Adherents name',  props<{nom: string}>());
export const findAdherents =  createAction('[App Init] find all Adherent',  props<{exercice: Date}>());
export const selectedAdherentForSearch = createAction('[App Init] selected for search Adherent',  props<AdherentResearchReponse>());
export const selectedAdherentByNomForSearch = createAction('[App Init] selectedName for name AdherentName',  props<AdherentList>());
export const createAdherentwithFamille = createAction('[App Init] Create Adherent with famille', props<AdherentFamille>());
export const importPhotosAdherent = createAction('[App Init] import photos adherent',
 props<{file: File, idAdherent: string, idGroupe: string}>());
export const importPhotosAdherentLot = createAction('[App Init] import photos adherent lot',  props<{file: File[], idGroupe: string}>());
export const loadListeActualiseeByExercice = createAction('[App Init] load liste actualisee by exercice final', props<{exerciceId: string}>());
export const loadListeActualisee = createAction('[App Init] load liste actualisee', props<{policeId: string}>());
export const setListeActualisee = createAction('[App Init] set Adherent',  props<{listeActualisee: Adherent[]}>());
export const searchAssureAndFamilleActe = createAction('[App Init] search Assure',  props<{numero: number}>());
export const loadAdherentByExercice = createAction('[App Init] load Adherent by exercice', props<{idGroupe: string, exerciceId: string}>());
export const searchAdherentByDateSoinsAndMatricule = createAction('[App Init] search Adherent By DateSoins And Matricule',  props<{dateSoins: Date, matricule: number}>());
export const loadListeFamille = createAction('[App Init] load liste famille', props<{adherentId: string}>());
export const createConditionGenerale = createAction('[App Init] Create condition generale', props<ConditionGenerale>());
export const setConditionGenerale = createAction('[App Init] set condition generale',  props<ConditionGeneraleList>());
export const deleteConditionGenerale = createAction('[App Init] delete condition generale', props<ConditionGenerale>());
export const loadConditionGenerale = createAction('[App Init] load Condition Generale');
export const importCondition = createAction('[App Init] import condition',  props<{file: File}>());
export const importCarteAdherentLot = createAction('[App Init] import cartes adherent lot',  props<{file: File[], idExercice: string}>());


