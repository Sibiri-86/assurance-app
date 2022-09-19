import { TypeJournaux } from "../../parametrage/typeJournaux/model"

export interface Journaux {
    id?: string,
    code?: string,
    libelle?: string,
    typeJournaux?: TypeJournaux,
    dateSaisie?: Date;
   
}
export interface  JournauxList {
    journauxList: Array<Journaux>
}