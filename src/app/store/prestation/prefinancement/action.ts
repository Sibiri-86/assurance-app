import { createAction, props } from '@ngrx/store';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { Report } from '../../contrat/police/model';
import { OrdreReglement, OrdreReglementList, Prefinancement, PrefinancementList } from './model';
export const createPrefinancement = createAction('[App Init] Create Prefinancement', props<{prefinancement: Array<Prefinancement>}>());
export const setPrefinancement = createAction('[App Init] set Prefinancement',  props<PrefinancementList>());
export const loadPrefinancement = createAction('[App Init] load prefinancement');
export const loadPrefinancementValide = createAction('[App Init] load prefinancement valide');
export const updateEtatAnnulerPrefinancement = createAction('[App Init] update etat annuler Prefinancement',
 props<{prefinancement: Prefinancement, etat: TypeEtatSinistre}>());
export const updateEtatValiderPrefinancement = createAction('[App Init] update etat valider Prefinancement',
 props<{prefinancement: Prefinancement, etat: TypeEtatSinistre}>());
export const createOrdreReglement = createAction('[App Init] Create Ordre de reglement', props<{prefinancement: Array<Prefinancement>}>());
export const validerOrdreReglement = createAction('[App Init] valider ordre reglement',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement}>());
export const deValiderOrdreReglement = createAction('[App Init] deValider ordre reglement',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement}>());
export const annulerOrdreReglement = createAction('[App Init] annuler ordre reglement',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement}>());
export const loadOrdreReglement = createAction('[App Init] load ordre reglement');
export const loadOrdreReglementValide = createAction('[App Init] load ordre reglement valide');
export const setLoadOrdreReglement = createAction('[App Init] set ordre reglement',  props<OrdreReglementList>());
export const FetchReportPrestation = createAction('[Report] Fetch Report prestation', props<Report>());
export const setReportPrestation = createAction('[set Report] set Report prestation', props<{reportFile: ArrayBuffer}>());