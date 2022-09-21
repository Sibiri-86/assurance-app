import { Banque } from "../../parametrage/Banques/model";
import { TypeJournaux } from "../../parametrage/typeJournaux/model"
import { TypePaiement } from "../../prestation/prefinancement/model";

export interface Journaux {
    id?: string,
    code?: string,
    libelle?: string,
    typeJournaux?: TypeJournaux,
    dateSaisie?: Date;
    typePaiement?: TypePaiement;
    banque?: Banque;
   
}
export interface  JournauxList {
    journauxList: Array<Journaux>
}