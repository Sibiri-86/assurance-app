export interface Compte {
    id?: string;
    compte?: string;
    poste?: string;
    libelle?: string;
    soldeDebiteur?: string;
    soldeCrediteur?: Date;
    compteParent?: string;
    isRacine?: boolean;
    isDeleted?: boolean;
    typePaiement?: Compte;
}

export interface CompteList{
    compteDtoList: Array<Compte>; 
}
