import { createAction, props } from '@ngrx/store';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { Report } from '../../contrat/police/model';
import {
    SinistreTierPayant,
    SinistreTierPayantList,
    Prestation,
    OrdreReglementTierPayantList, CheckTierPayantReponse,
} from './model';
import {OrdreReglementTierPayant} from './model';


export const createTierPayant = createAction('[App Init] Create TierPayant', props<{tierPayant:Array<SinistreTierPayant>}>());
export const createTierPayantNoList = createAction('[App Init] Create TierPayant no list', props<{tierPayant:SinistreTierPayant}>());
export const setTierPayant = createAction('[App Init] set TierPayant',  props<SinistreTierPayantList>());
export const loadTierPayant = createAction('[App Init] load tierPayant');
export const FetchReportTierPayant = createAction('[Report] Fetch Report tierPayant', props<Report>());
export const setReportTierPayant = createAction('[set Report] set Report tierPayant', props<{reportFile: ArrayBuffer}>());
export const updateEtatValiderTierPayant = createAction('[App Init] update etat valider TierPayant',
    props<{tierPayant: SinistreTierPayant, etat: TypeEtatSinistre}>());
export const loadTierPayantOrdreReglementValide = createAction('[App Init] load tier payant ordre reglement valide');
export const loadTierPayantValide = createAction('[App Init] load TierPayant valide');
export const updateEtatAnnulerTierPayant = createAction('[App Init] update etat annuler TierPayant',
    props<{tierPayant: SinistreTierPayant, etat: TypeEtatSinistre}>());
export const createTierPayantOrdreReglement = createAction('[App Init] Create Tier Payant Ordre de reglement',
    props<{tierPayant: Array<SinistreTierPayant>}>());
export const deletePrestationTierPayant = createAction('[set Report] delete prestationTierPayant', props<Prestation>());
export const deleteTierPayant = createAction('[delete TierPayant] delete TierPayant', props<{tierPayant:
        Array<SinistreTierPayant>}>());
export const loadOrdreReglementTierPayant = createAction('[App Init] load TierPayantReglement');
export const setLoadOrdreReglementTierPayant = createAction('[App Init] set ordre reglement tierPayant',
    props<OrdreReglementTierPayantList>());
export const validerTierPayantOrdreReglement = createAction('[App Init] update TierPayant ordre reglement',
    props<{ordre: OrdreReglementTierPayant, etat: TypeEtatOrdreReglement}>());
export const deValiderOrdreReglement = createAction('[App Init] deValider TierPayant ordre reglement',
    props<{ordre: OrdreReglementTierPayant, etat: TypeEtatOrdreReglement}>());
export const deleteTierPayantOrdreDeReglement = createAction('[delete ordre de reglement] delete TierPayant ordreReglement',
    props<{ordreReglement: Array<OrdreReglementTierPayant>}>());
export const checkTierPayant = createAction('[App Init] Check TierPayant', props<{tierPayant: Array<SinistreTierPayant>}>());
export const setTierPayantResponse = createAction('[App Init] Check TierPayant reponse', props<CheckTierPayantReponse>());

export const searchTiersPayant = createAction('[App Init] search TierPayant', props<{matricule: number,
    dateDeclaration: string}>() );

export const searchTiersPayantByFacture = createAction('[App Init] search TierPayant by Facture', props<{numeroFacture: string,
     dateDeclaration: string}>() );

export const searchTierPayantOrdreReglement = createAction('[App Init] search Tier payantordre reglement', props<{numero: string,
        date: string}>() );
export const loadTierPayantOrdreReglementFactureInstance = createAction('[App Init] load tier payant facture instance');
export const validerPaiement = createAction('[App Init] valider facture',
props<{ordre: OrdreReglementTierPayant}>());
export const devaliderPaiement = createAction('[App Init] devalider facture par facture',
props<{ordre: OrdreReglementTierPayant}>());
export const loadTierPayantOrdreReglementFacturePaye = createAction('[App Init] load tier payant facture paye');







