import { Garant } from "src/app/store/parametrage/garant/model";
import { Recapitulatif } from "../recapitulatif/model";


export interface StatistiqueParTrancheAge {
    id?: string;
    trancheAge?: string;
    effectifPeriodeNombre?: number;
    effectifPeriodeTaux?: number;
    depensePeriodeMontant?: number;
    depensePeriodeTaux?: number;
    coutMoyen?: number;
    dateDebut?: Date;
    dateFin?: Date;
}


export interface RecapitulatifList {
    trancheAges: Array<StatistiqueParTrancheAge>;
}