export interface AppelFond {
    id?: string;
    destinataire?: string;
    numeroRef?: string;
    libelle?: string;
    objet?: string;
    typeCompte?: TypeCompte;
    dateAppel?: Date;
    montantAppel?: number;
    signataire?: string;
    isDeleted?: boolean;
}

export enum TypeCompte {
    ORANGE_MONEY = 'ORANGE MONEY',
    BANCAIRE = 'BANCAIRE'
}

export interface AppelFondList{
    appelFondDtoList: Array<AppelFond>; 
}
