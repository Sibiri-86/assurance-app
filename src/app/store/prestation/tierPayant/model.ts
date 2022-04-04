import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Adherent } from '../../contrat/adherent/model';
import { Police } from '../../contrat/police/model';
import { Medecin } from '../../parametrage/medecin/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { ProduitPharmaceutique } from '../../parametrage/produit-pharmaceutique/model';
import { SousActe } from '../../parametrage/sous-acte/model';
import { Taux } from '../../parametrage/taux/model';
import {OrdreReglement, Prefinancement} from '../prefinancement/model';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../parametrage/plafond/model';
import {Acte} from '../../parametrage/acte/model';
import {Sort} from '../../../module/common/models/sort.enum';
import {TypeEtatSinistre} from '../../../module/common/models/enum.etat.sinistre';
import { HistoriqueAvenant } from '../../contrat/historiqueAvenant/model';

export interface Sinistre {
    referenceSinistreGarant?: string;
    police?: string;
}


export interface OrdreReglementTierPayantList {
    ordreReglementTierPayantDTOList?: Array<OrdreReglementTierPayant>;
}

export interface OrdreReglementTierPayant{
    id?: string;
    numero?: string;
    numeroBordereau?: string;
    police?: Police;
    tierPayant?: Array<SinistreTierPayant>;
    etat?: TypeEtatOrdreReglement;
}

export interface SinistreTierPayant {
    id?: string;
    dateSoins?: Date;
    referenceBordereau?: string;
    dateDeclaration?: Date;
    dateSaisie?: Date;
    adherent?: Adherent;
    numeroSinistre?: string;
    ordreReglementTierPayant?: OrdreReglementTierPayant;
    prestation?: Array<Prestation>;
    numeroFacture?: string;
    dateFacture?: Date;
    prestataire?: Prestataire;
    etat?: TypeEtatSinistre;
}

export interface Prestation {
    id?: string;
    coutUnitaire?: number;
    debours?: number;
    baseRemboursement?: number;
    taux?: Taux;
    montantRembourse?: number;
    observation?: string;
    sousActe?: PlafondSousActe;
    prestataire?: Prestataire;
    medecin?: Medecin;
    dateSoins?: Date;
    produitPharmaceutique: Array<ProduitPharmaceutique>;
    familleActe?: PlafondFamilleActe;
    acte?: PlafondActe;
}

export interface SinistreTierPayantList {
    sinistreTierPayantDTOList: Array<SinistreTierPayant>;
}

export interface CheckTierPayantReponse {
    TierPayantCheckReponse: Array<SinistreTierPayant>;
}

export interface CheckTierPayantResult {
    montantRembourse?: number;
    code?: number;
    message?: string;
    montantRestant?: number;
    sort?: Sort;
    historiqueAvenant?: HistoriqueAvenant;
}

export interface CheckTierPayantReponse {
    list: Array<CheckTierPayantResult>;
}
