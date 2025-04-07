import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Adherent } from '../../contrat/adherent/model';
import { Police } from '../../contrat/police/model';
import { Medecin } from '../../parametrage/medecin/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { ProduitPharmaceutique } from '../../parametrage/produit-pharmaceutique/model';
import { SousActe } from '../../parametrage/sous-acte/model';
import { Taux } from '../../parametrage/taux/model';
import {BonPriseEnCharge, OrdreReglement, Prefinancement, Saisie, TypePaiement, TypePrestation} from '../prefinancement/model';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../parametrage/plafond/model';
import {Acte} from '../../parametrage/acte/model';
import {Sort} from '../../../module/common/models/sort.enum';
import {TypeEtatSinistre} from '../../../module/common/models/enum.etat.sinistre';
import { HistoriqueAvenant } from '../../contrat/historiqueAvenant/model';
import { Exercice } from '../../contrat/exercice/model';
import { Pathologie } from '../../parametrage/pathologie/model';
import { BoundElementProperty } from '@angular/compiler';
import { Banque } from '../../parametrage/Banques/model';
import { Compte } from '../../comptabilite/compte/model';
import { Tiers } from '../../comptabilite/tiers/model';
import { Journaux } from '../../comptabilite/journaux/model';

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
    typePaiement?: TypePaiement;
    banque?: Banque;
    montantPaye?: number;
    isPaiement?: Boolean;
    isTakeCheque?: Boolean;
    sticker?: string;
    stickerConfirmation?: string;
    devalider?: Boolean;
    prestataire?: string;
    date?: Date;
    datePriseCheque?: Date;
    datePaiement?:Date;
    dateDeSaisie?:Date;
    numeroCheque?:string;
    numeroFactureSinistre?:string;
    motifDevalidation?:string;
    compte?: Compte;
    journaux?: Journaux;
    compteTiers?: Tiers;
    compteTiersPrestataire?: Tiers;
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
    bonPriseEnCharge?: BonPriseEnCharge;
    montantReclame?:number;
    montantPaye?:number;
    montantRestant?:number;
    statSaisie?: Saisie;
    operateur?: string;
    sinistreTierPayantPrincipal?: SinistreTierPayant;
    
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
    produitPharmaceutique?: Array<ProduitPharmaceutique>;
    produit?: ProduitPharmaceutique;
    familleActe?: PlafondFamilleActe;
    acte?: PlafondActe;
    centreExecutant?: Prestataire;
    historiqueAvenant?: HistoriqueAvenant;
    montantPaye?: number;
    montantReclame?: number;
    montantRestant?: number;
    adherent?: Adherent,
    exercice?:Exercice,
    bonPriseEnCharge?: BonPriseEnCharge;
    montantPlafond?: number;
    sort?: Sort;
    nombreActe?: number;
    sinistreTierPayant?: SinistreTierPayant;
    numeroGroupe?: string;
    numeroPolice?: string;
    prenomAdherent?: string;
    nomAdherent?: string;
    matriculeAdherent?: string; 
    numeroBon?: string;
    prenomAdherentPrincipal?: string;
    nomAdherentPrincipal?: string;
    inotPlafond?: Boolean;
    pathologie?: Pathologie;
    dateRetrait?: Date; 
    souscripteur?: string;
    nomGroupe?: string;
    montantExclu?: number;
    typePrestation?: TypePrestation;
    operateur?: string;
    updatPrest?: boolean;
}

export interface ConsommationPasse {
    id?:string;
    souscripteur?:string;
    numSinistre?:string;
    numOrdreReglement?:string;
     dateSur?:Date;
     dateDeclaratioin?:Date;
    nomBeneficiaire?:string;
     qualiteAssure?:string;
    libelleGroupe?:string;
    codeFamille?:string;
    libelleActe?:string;
    codeSousActe?:string;
    montantTotal?:number;
    montantRembourse?:number;
    libellePrestataire?:string;
    numFacture?:string;
     dateFacture?:Date;
     dateValidation?:Date;
     dateCreationOrdre?:Date;
    phatologie?:string;
     numeroGroupe?:number;
    nomAdherent?:string;
     codeMembre?:string;
    dateSaisie?:Date;
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
