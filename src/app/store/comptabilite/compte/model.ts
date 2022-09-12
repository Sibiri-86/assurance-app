export interface Compte {
    id?: string;
    compte?: string;
    poste?: string;
    libelle?: string;
    soldeDebiteur?: string;
    soldeCrediteur?: Date;
    compteParent?: string;
    isRacine?: boolean;
}
