import { createAction, props } from '@ngrx/store';
import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { Report } from '../../contrat/police/model';
import { TypePaiement } from '../../prestation/prefinancement/model';
import { Remboursement, RemboursementList } from './model';
export const createRemboursement = createAction('[App Init] Create Remboursement', props<{idAdherent: string,numero: number,id: string,typePaiement: TypePaiement,
    numeroOrange:string, numeroMobicash:string, numeroVirement:string, nomBenefiniciaire: string,  files: File[]}>());
export const setRemboursement = createAction('[App Init] set Remboursement',  props<RemboursementList>());
export const ValiderRemboursementPrestation = createAction('[App Init] Valider Remboursement prestation',  props<Remboursement>());
export const ValiderRemboursementMedical = createAction('[App Init] Valider Remboursement madical',  props<Remboursement>());
export const loadRemboursement = createAction('[App Init] load Remboursement',  props<{numero: number}>());
export const loadRemboursementPrestation = createAction('[App Init] load Remboursement FOR Prestation');
export const loadRemboursementMedical = createAction('[App Init] load Remboursement for Medical');
export const setReportRemboursement = createAction('[set Report] set Report Remboursement', props<{reportFile: ArrayBuffer}>());
