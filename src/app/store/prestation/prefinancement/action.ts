import { createAction, props } from '@ngrx/store';
import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { Report } from '../../contrat/police/model';
import {  MontantPlafondGarantieResponse } from './model';
import { CheckPlafond, CheckPlafondResponse, CheckPrefinancementReponse, OrdreReglement, OrdreReglementList, OrdreReglementListFinance, OrdreReglementListMedical, Prefinancement, PrefinancementList, Prestation } from './model';
export const createPrefinancement = createAction('[App Init] Create Prefinancement', props<{prefinancement: Array<Prefinancement>, dateD: string, dateF: string}>());
export const setPrefinancement = createAction('[App Init] set Prefinancement',  props<PrefinancementList>());
export const loadPrefinancement = createAction('[App Init] load prefinancement');
export const loadPrefinancementValide = createAction('[App Init] load prefinancement valide');
export const updateEtatAnnulerPrefinancement = createAction('[App Init] update etat annuler Prefinancement',
 props<{prefinancement: Prefinancement, etat: TypeEtatSinistre}>());
export const updateEtatValiderPrefinancement = createAction('[App Init] update etat valider Prefinancement',
 props<{prefinancement: Prefinancement, etat: TypeEtatSinistre, dateD: string, dateF: string}>());
export const createOrdreReglement = createAction('[App Init] Create Ordre de reglement', props<{prefinancement: Array<Prefinancement>}>());
export const validerOrdreReglement = createAction('[App Init] valider ordre reglement',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement}>());
export const deValiderOrdreReglement = createAction('[App Init] deValider ordre reglement',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement, w: Workflow}>());
export const annulerOrdreReglement = createAction('[App Init] annuler ordre reglement',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement, w: Workflow}>());
export const loadOrdreReglement = createAction('[App Init] load ordre reglement');
export const loadOrdreReglementValide = createAction('[App Init] load ordre reglement valide');
export const setLoadOrdreReglement = createAction('[App Init] set ordre reglement',  props<OrdreReglementList>());
export const FetchReportPrestation = createAction('[Report] Fetch Report prestation', props<Report>());
export const setReportPrestation = createAction('[set Report] set Report prestation', props<{reportFile: ArrayBuffer}>());
export const deletePrestation = createAction('[set Report] delete prestation', props<Prestation>());
export const deletePrefinancement = createAction('[delete prefinancement] delete prefinancement', props<{prefinancement:
    Array<Prefinancement>}>());
export const deleteOrdreDeReglement = createAction('[delete ordre de reglement] delete ordreReglement', props<{ordreReglement:
        Array<OrdreReglement>}>());
export const checkPrefinancement = createAction('[App Init] Check Prefinancement', props<{prefinancement: Array<Prefinancement>}>());
export const setCheckPrefinancement = createAction('[App Init] Check Prefinancement reponse', props<CheckPrefinancementReponse>());
/** */
export const searchPrefinancement = createAction('[App Init] search prefinancement', props<{matricule: number,
     dateDeclaration: string}>() );
export const searchOrdreReglement = createAction('[App Init] search ordre reglement', props<{numero: string,
        date: string}>() );
/**check plafond des sous actes */
export const checkPlafond = createAction('[App Init] Check plafond sous acte', props<CheckPlafond>());
export const setPlafondSousActe = createAction('[set Plafond] set plafond', props<CheckPlafondResponse>());
export const loadOrdrePaiementInstance = createAction('[App Init] load ordre paiement instance');
export const setLoadOrdrePaiementInstance = createAction('[App Init] load ordre paiement instance set',  props<CheckPlafondResponse>());
export const loadOrdrePaiementInstanceCheque = createAction('[App Init] load ordre paiement instance cheque');
export const loadOrdrePaiementValide = createAction('[App Init] load ordre paiement valide en caisse');
export const validerPaiementEspece = createAction('[App Init] valider ordre paiement espece',
props<{ordre: OrdreReglement}>());
export const validerPaiementCheque = createAction('[App Init] valider ordre paiement cheque',
props<{ordre: OrdreReglement}>());
export const paiementChequeCaisseDevalider = createAction('[App Init] devalider ordre paiement caisse',
props<{ordre: OrdreReglement}>());
/* export const checkMontantRestantPlafondGarantie = createAction('[App Init] Check plafond famille acte', props<CheckMontantRestantPlafondGarantieResponse>());
export const setPlafondGarantie = createAction('[set Plafond] set Plafond famille acte', props<{check:CheckMontantRestantPlafondGarantie}>()); */
export const checkMontantRestantPlafondGarantie = createAction('[App Init] Check plafond famille acte',  props<{assureId: string, exerciceId: string, familleActeId: string, groupeId: string}>());
export const selectedMontantForSearch = createAction('[App Init] selected for search plafond famille acte',  props<MontantPlafondGarantieResponse>());
//export const selectedMontantForSearch1 = createAction('[App Init] selected for search1 for plafond famille acte',  props<CheckMontantRestantPlafondGarantie>());
export const loadOrdreReglementValideMedical = createAction('[App Init] load ordre reglement valide medical');
export const setLoadOrdreReglementMedical = createAction('[App Init] set ordre reglement Medical',  props<OrdreReglementListMedical>());
export const loadOrdreReglementValideFinance = createAction('[App Init] load ordre reglement valide Finance');
export const setLoadOrdreReglementFinance = createAction('[App Init] set ordre reglement Finance',  props<OrdreReglementListFinance>());
export const validerOrdreReglementWorkflow = createAction('[App Init] valider ordre reglement workflow',
props<{ordre: OrdreReglement, etat: TypeEtatOrdreReglement, w: Workflow}>());
export const loadOrdreReglementValideDirection = createAction('[App Init] load ordre reglement valide Direction');
export const setLoadOrdreReglementDirection = createAction('[App Init] set ordre reglement Direction',  props<OrdreReglementList>());
export const loadPrefinancementPeriode = createAction('[App Init] load prefinancement by periode', props<{dateD: string,
        dateF: string}>() );
export const loadOrdreReglementValidePeriode = createAction('[App Init] load ordre reglement valide by periode', props<{dateD: string,
                dateF: string}>());
