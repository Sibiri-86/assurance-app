import { DimensionPeriode } from "../dimension-periode/model";
import { QualiteAssure } from "../qualite-assure/model";
import { Taux } from "../taux/model";

export interface SousActe {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    libelleTypeActe?: string;
    idTypeActe?: string;
    libelleGenre?: string;
    idGenre?: string;
    montantConvantion?: number;
    dateEffet?: Date;
    dimensionPeriode?: DimensionPeriode;
    domaine?: Array<QualiteAssure>;
    montantPlafond?: number;
    montantPrime?: number;
    taux?: Taux;
    montantPlafondParActe?: number;
}
export interface SousActeList {
    typeSousActeDtoList?: Array<SousActe>;
}