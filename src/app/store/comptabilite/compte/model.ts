import { Banque } from "../../parametrage/Banques/model";
import { TypePaiement } from "../../prestation/prefinancement/model";

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
    typePaiement?: TypePaiement;
    banque?: Banque;

}

export interface CompteList{
    compteDtoList: Array<Compte>; 
}
