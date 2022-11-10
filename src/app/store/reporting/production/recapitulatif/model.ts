import { Garant } from "src/app/store/parametrage/garant/model";


export interface Recapitulatif {
    id?: string;
    police?: string;
    souscripteur?: string;
    dateEffet?: Date;
    dateEcheance?: Date;
    effectif?: string;
    primeNette?: number;
    primeAcquise?: number;
    sinistre?: number;
    sinistreSurPrime?: string;
    resultatTechnique?: number;
    observation?: string;
    datePrime?: Date;
    idGarant?: Garant;
}


export interface RecapitulatifList {
    recapitulatif: Array<Recapitulatif>;
}