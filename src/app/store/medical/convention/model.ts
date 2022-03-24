import { Prestataire } from '../../parametrage/prestataire/model';
import { SousActe } from '../../parametrage/sous-acte/model';

export interface Convention {
    id?: string;
    montant?: number;
    prestataire?: Prestataire;
    sousActe?: SousActe;
}

export interface ConventionList {
    conventionList?: Array<Convention>;
}
