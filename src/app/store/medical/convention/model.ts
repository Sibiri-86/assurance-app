import { Commune } from '../../parametrage/commune/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { SousActe } from '../../parametrage/sous-acte/model';

export interface Convention {
    id?: string;
    montant?: number;
    prestataire?: Prestataire;
    sousActe?: SousActe;
    sousActes?: SousActe[];
    commune?: Commune;
    nomResponsablePrestation?: string;
    dateEffet?: Date;
    delai?: number;
    convenstionList?: Convention[];
}

export interface ConventionList {
    conventionList?: Array<Convention>;
}
