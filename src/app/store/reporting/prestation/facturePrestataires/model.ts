import { Groupe } from "src/app/store/contrat/groupe/model";
import { Police } from "src/app/store/contrat/police/model";
import { Garant } from "src/app/store/parametrage/garant/model";
import { Prestataire } from "src/app/store/parametrage/prestataire/model";
import { TypePrestataire } from "src/app/store/parametrage/type-prestataire/model";


export interface FacturePrestataires {
    id?: string;
    typePrestataire?: TypePrestataire;
    // prestataires: Prestataire;
    nombreFacture?: number;
    frequences?: number;
    garant?: Garant;
    police?: Police;
    groupe?: Groupe;
    dateDebut?: Date;
    dateFin?: Date;
}


