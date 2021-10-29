import { QualiteAssure } from "../../parametrage/qualite-assure/model";
import { PlafondFamilleActe } from "../../parametrage/plafond/model";
import { Groupe } from "../groupe/model";
export interface Plafond {
    id?: string,
    domaine?: QualiteAssure,
    plafondAnnuelleFamille?: number,
    plafondGlobalInternationnal?: number,
    plafondAnnuellePersonne?: number,
    plafondFamilleActe?: Array<PlafondFamilleActe>,
    groupe: Groupe
}

export interface PlafondList {
    plafondDtoList: Array<Plafond>
}