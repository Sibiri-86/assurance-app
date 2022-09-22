import { Garant } from "../../contrat/garant/model";

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

export interface AppelFondList{
    appelFondDtoList: Array<AppelFond>; 
}
