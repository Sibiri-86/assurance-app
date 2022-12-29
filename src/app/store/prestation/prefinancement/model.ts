import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Sort } from 'src/app/module/common/models/sort.enum';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { Adherent } from '../../contrat/adherent/model';
import { HistoriqueAvenant, TypeHistoriqueAvenant } from '../../contrat/historiqueAvenant/model';
import { Police } from '../../contrat/police/model';
import { Acte } from '../../parametrage/acte/model';
import { Banque } from '../../parametrage/Banques/model';
import { Garantie } from '../../parametrage/garantie/model';
import { Medecin } from '../../parametrage/medecin/model';
import { PlafondSousActe } from '../../parametrage/plafond/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { ProduitPharmaceutique } from '../../parametrage/produit-pharmaceutique/model';
import { SousActe } from '../../parametrage/sous-acte/model';
import { Taux } from '../../parametrage/taux/model';
import { SinistreTierPayant } from '../tierPayant/model';


export interface Sinistre {
    referenceSinistreGarant?: string;
    police?: string;
}


export interface OrdreReglementList {
    ordreReglementDtoList?: Array<OrdreReglement>;
}
export interface OrdreReglementListMedical {
    ordreReglementDtoList?: Array<OrdreReglement>;
}

export interface OrdreReglementListFinance {
    ordreReglementDtoList?: Array<OrdreReglement>;
}

export interface OrdreReglementListDirection {
    ordreReglementDtoList?: Array<OrdreReglement>;
}

export interface OrdreReglement {
    id?: string;
    date?: Date;
    numero?: string;
    numeroBordereau?: string;
    police?: Police;
    prefinancement?: Array<Prefinancement>;
    etat?: TypeEtatOrdreReglement;
    montantPaye?: number;
    banque?: Banque;
    assure?: Adherent;
    isPaiement?: Boolean;
    niveauValidation?: Workflow;
    referenceCheque?:string;
    dateValidationPrestation?: string;
    dateValidationMedical?: string;
    dateValidationFinance?: string;
    dateValidationDirection?: string;
    montantReclame?: number;
}

export interface Prefinancement {
    id?: string;
    dateSoins?: Date;
    referenceBordereau?: string;
    dateSaisie?: Date;
    dateDeclaration?: Date;
    adherent?: Adherent;
    numeroSinistre?: string;
    ordreReglement?: OrdreReglement;
    prestation?: Array<Prestation>;
    prestataire?: Prestataire;
    bonPriseEnCharge?: BonPriseEnCharge;
    typePaiement?: TypePaiement;
    numeroOrange?: string;
    numeroMobicash?: string;
    numeroVirement?: string;
    nomBenefiniciaire?: string;
}

export interface BonPriseEnCharge {
    id?: string;
    dateSoins?: Date;
    referenceBordereau?: string;
    dateSaisie?: Date;
    dateDeclaration?: Date;
    adherent?: Adherent;
    numeroSinistre?: string;
    souscripteur?: string;
    prestataire?: Prestataire;
    prestation?: Array<Prestation>;
    typeBon?: TypeBon;
}

export interface CheckPlafond {
    sousActe?: SousActe;
    adherent?: Adherent;
    dateSoins?: Date;
}

export interface CheckPlafondResponse {
    montant?: number;
}

export interface Prestation {
    id?: string;
    coutUnitaire?: number;
    nombreActe?: number;
    sort?: Sort;
    debours?: number;
    baseRemboursement?: number;
    taux?: Taux;
    montantRembourse?: number;
    observation?: string;
    sousActe?: SousActe;
    acte?: Acte;
    prestataire?: Prestataire;
    centreExecutant?: Prestataire;
    medecin?: Medecin;
    /*ajout des autres informations*/
    dateSoins?: Date;
    montantSupporte?: number;
    familleActe?: Garantie;
    montantPlafond?: number;
    produitPharmaceutique?: Array<ProduitPharmaceutique>;
    sinistreTierPayant?: SinistreTierPayant; 
    inotPlafond?: Boolean;
    adherent?: Adherent;
    montantExclu?: number;
    typePrestation?: TypePrestation;
    garantie?: Garantie;
    /*ajout information pour bon de prise en charge*/
}

export interface PrefinancementList {
    prefinancementDtoList: Array<Prefinancement>;
}

export interface CheckPrefinancementResult {
montantRembourse?: number;
code?: number;
message?: string;
montantRestant?: number;
sort?: Sort;
historiqueAvenant?: HistoriqueAvenant;
}

export interface CheckPrefinancementReponse {
    list: Array<CheckPrefinancementResult>;
}

export enum TypePaiement {
    ESPECE = 'ESPECE',
    ORANGE_MONEY = 'ORANGE_MONEY',
    MOOV_MONEY = 'MOOV_MONEY',
    CHEQUE = 'CHEQUE',
    VIREMENT = 'VIREMENT'

}

export enum TypePrestation {
    PREFINANCEMENT = 'PREFINANCEMENT',
    TIERSPAYSANT = 'TIERSPAYSANT',
    
}

 export interface ReponseCheckMontantRestantGarantie {
    message?: string;
    montantPrestation?: number;
    montantRestant?: number;
    montantPlafond?: number;
    assureId?: string;
    exerciceId?: string;
    familleActeId?: string;
    groupeId?: string;
} 

export interface MontantPlafondGarantieResponse {
    checkMontantRestantPlafondGarantie?: ReponseCheckMontantRestantGarantie;
}
/* export interface CheckMontantRestantPlafondGarantieResponse {
    checkMontantRestantPlafondGarantie?: CheckMontantRestantPlafondGarantie
} */


