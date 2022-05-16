import { BoundElementPropertyAst } from '@angular/compiler';
import { Adherent } from '../adherent/model';
import { AffectionPasse, Choix, Defaut, MaladieProche, SituationFamiliale } from '../enum/model';
import { Groupe } from '../groupe/model';
import { Police } from '../police/model';

export interface BulletinAdhesion {
    id?: number;
    dateSaisie?: Date;
    matriculeAdherent?: string;
    adherent?: Adherent; 
    nomAdherent?: string;
    prenomAdherent?: string;
    nomAssurePrin?: string;
    prenomAssurePrin?: string;
    numeroGroupe?: string;
    numeroPolice?: string;
    nomGroupeAdherent?: string;
    nomPoliceAdherent?: string;
    groupe?: Groupe;
    police?: Police;
    adherentPrincipal?: Adherent;
    raisonSociale?:string;
    dateEntreeService?: Date;
    adresse?: string;
    tel?: string;
    emploi?: string;
    lieuNaissance?: string;
    situationFamiliale?: SituationFamiliale;
    nombreEnfant?: string;
    epouse?: Epouse;
    enfants?: Enfant[];
    question?: Questionnaire;
    
    
}
export interface Questionnaire {
    id?: number;
    poids?: number;
    taille?: number;
    isSante?: Choix;
    defaut?: Defaut;
    infection?: AffectionPasse;
    traitementSuivre?: Choix;
    detailAccident?: string;
    maladieAnterieur?: string;
    avoirHosp?: Choix;
    natureSoins?: string;
    maladieProche?: MaladieProche;
    serviceMilitair?: string;
    exempte?: string;
    blesse?: string;
    pension?: string;
    tauxPension?: number;
    maladieFemme?: string;
    normalCouche?: Choix;
    casParticulier?: string;
    traitement?: Choix;
    subiAccident?: Choix;
}
export interface Enfant {
    id?: string;
    nomEnfant?: string;
    prenomEnfant?: string;
    dateNassance?: Date;
    lieuNaisssance?: string;
    question?: Questionnaire;
}

export interface Epouse {
    id?: string;
    nomEpouse?: string;
    dateNaissanceEpoux?: Date;
    emploiEpouse?: string;
    lieuNaissanceEpouse?: string;
   question?: Questionnaire;
    
}


export interface ReportFile {
    reportFile?: ArrayBuffer;
}


export interface BulletinAdhesionList{
    bulletinAdhesionList?: Array<BulletinAdhesion>;
}
