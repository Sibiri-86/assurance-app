import { TypeEtatSinistre } from "src/app/module/common/models/enum.etat.sinistre";
import { Groupe } from "src/app/store/contrat/groupe/model";
import { Garant } from "src/app/store/parametrage/garant/model";
import { Adherent } from "../../contrat/adherent/model";
import { Police } from "../../contrat/police/model";
import { Garantie } from "../../parametrage/garantie/model";
import { Pathologie } from "../../parametrage/pathologie/model";
import { Prestataire } from "../../parametrage/prestataire/model";
import { TypePrestataire } from "../../parametrage/type-prestataire/model";
import { Prestation, TypePaiement } from "../../prestation/prefinancement/model";
import { Sinistre, SinistreTierPayant } from "../../prestation/tierPayant/model";


export interface Recapitulatif {
    id?: string;
    police?: string;
    souscripteur?: string;
    dateEffet?: Date;
    dateEcheance?: Date;
    effectif?: string;
    primeNette?: number;
    primeAcquise?: number;
    sinistre?: number;
    sinistreSurPrime?: string;
    resultatTechnique?: number;
    observation?: string;
    datePrime?: Date;
    idGarant?: Garant;
    groupe?: Groupe;
    dateDebut?: Date;
    policeId?: string;
    groupeId?: string;
    garantId?: string;
}

export interface ConsommationParFamille {
    /* matriculeAdherentP?: number;
    montantReclameFamille?: number;
    montantRembourseFamille?: number;
    montantNonRembourseFamille?: number;
    PopulationActive?: number;
    PopulationTraitee?: number;
    totalMontantReclame?: number;
    totalMontantRembourse?: number;
    coutMoyenFamille?: number;
    coutMoyenTotal?: number; */
    garantId?: string;
    policeId?: string;
    groupeId?: string;
    dateDebut?: Date;
    dateFin?: Date;
}


export interface RecapitulatifList {
    recapitulatif: Array<Recapitulatif>;
}

export interface DepenseFamille {
    adherent?: Adherent;
    adherentP?: Adherent;
    age?: number;
    nature?: string;
    totalMontantReclame?: number;
    totalMontantRembourse?: number;
    prestationList?:Array<Prestation>;
    familleActe?: Garantie;
    nombreActe?: number;
    montantRembourse?: number;
    coutMoyen?: number;
    taux?: number;
    nombreActePrecedent?: number;
    montantRemboursePrecedent?: number;
    coutMoyenPrecedent?: number;
    totalMontantRemboursePrecendet?: number;
    tauxPrecedent?: number;
    prestataire?: Prestataire ;
    pathologie?: Pathologie ;
    totalMontantReclameFamille?: number;
    totalMontantRembourseFamille?: number;
    boolFamille?:boolean;
    boolGeneral?:boolean;
    informationPrincipal?:boolean;
    boolPrincipal?:boolean;
    adherentId?:number;
    dateDebut?: Date;
    dateFin?: Date;
}

export interface ConsommationPortail {
    adherent?: Adherent;
    totalMontantReclameSinistre?: number;
    totalMontantRembourseSinistre?: number;
    totalMontantReclameSinistreTiersPayant?: number;
    totalMontantRembourseSinistreTiersPayant?: number;
    coutMoyen?: number;
    totalMontantReclameFamille?: number;
    totalMontantRembourseFamille?: number;
    dateDebut?: Date;
    dateFin?: Date;
    SinistreList?: Array<Sinistre>;
    SinistreTierPayantList?: Array<SinistreTierPayant>;
}

export interface PrefinancementPortail {
    id?: string;
    police?: Police;
    dateDeclaration?:Date;
    numeroSinistre?: string;
    // private OrdreReglementDto ordreReglement;
    prestation?: Array<Prestation>;
    adherent?: Adherent;
    dateSaisie?:Date;
    etat?: TypeEtatSinistre;
    typePaiement?: TypePaiement;
    nomBenefiniciaire?: string;
    numeroOrange?: string;
    numeroMobicash?: string;
    numeroVirement?: string;
    dateSoins?:Date;
    montantReclame?: number;
    montantRembourse?: number;
    montantTotalReclame?: number;
    montantTotalRembourse?: number;
}

export interface TiersPayantPortail{
    id?: string;
    police?: Police;
    dateDeclaration?: string;
    numeroSinistre?: string;
    numeroFacture?: string;
    adherent?: Adherent;
    prestation?: Array<Prestation>;
    dateSaisie?:Date;
    dateFacture?:Date;
    prestataire?: Prestataire;
    etat?: TypeEtatSinistre;
    montantReclame?:number;
    montantPaye?:number;
    montantRestant?:number;
    montantPlafond?:number;
    typePrestataire?:TypePrestataire;
}