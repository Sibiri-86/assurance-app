import { TypeJournaux } from "../../parametrage/typeJournaux/model"
import { TypePaiement } from "../../prestation/prefinancement/model";

export interface Journaux {
    id?: string,
    code?: string,
    libelle?: string,
    typeJournaux?: TypeJournaux,
    dateSaisie?: Date;
    typePaiement?: TypePaiement;
   
}
export interface  JournauxList {
    journauxList: Array<Journaux>
}