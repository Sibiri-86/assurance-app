import {EspaceAsuranceVoyage} from '../enum/model';

export interface AssuranceVoyage {
    id?: string;
    nombreJour?: number;
    dateSaisie?: Date;
    destination?: EspaceAsuranceVoyage;
    prestationVoyages?: Array<PrestationVoyage>;
}

export interface PrestationVoyage{
    trancheAgeSup?: number;
    trancheAgeInf?: number;
    montant?: number;
}

export interface AssuranceVoyageList {
    assuranceVoyageDtoList?: Array<AssuranceVoyage>;
}
