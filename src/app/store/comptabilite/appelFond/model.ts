import { Garant } from "../../contrat/garant/model";
import { Compte } from "../compte/model";

export interface AppelFond {
    id?: string;
    destinataire?: string;
    numeroRef?: string;
    libelle?: string;
    objet?: string;
    typeCompte?: TypeCompte;
    dateAppel?: Date;
    montantAppel?: number;
    garant?:Garant;
    signataire?: string;
    isDeleted?: boolean;
    totalAppel?: number;
    dateDebut?: Date;
    dateFin?: Date;
}

export enum TypeCompte {
    ORANGE_MONEY = 'ORANGE MONEY',
    BANCAIRE = 'BANCAIRE'
}

export enum TypeBalance {
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE'
}

export enum TypeEtatBalance {
    SIX = '6 COLONNES',
    HUIT = '8 COLONNES'
}

export interface AppelFondList{
    appelFondDtoList: Array<AppelFond>; 
}

export interface Balance {
    id?: string;
    typeBalance?: TypeBalance;
    dateDebut?: Date;
    dateFin?: Date;
    compteDebut?: Compte;
    compteFin?: Compte;
    codeDebut?: Compte;
    codeFin?: Compte;
    typeEtatBalance?: TypeEtatBalance;
    
}
