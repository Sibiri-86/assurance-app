import { Adherent } from '../../contrat/adherent/model';
import { Garant } from '../../contrat/garant/model';
import { Police } from '../../contrat/police/model';
import { Garantie } from '../../parametrage/garantie/model';

import { Prestation } from '../../prestation/tierPayant/model';

export interface DepenseFamille {
     adherent?: Adherent;
     prestationList?: Array<Prestation>;
}



export interface Check {
    garantId?: string;
    garant?: Garant;
    policeId?: string;
    police?: Police;
    adherentPrincipalId?: string;
    adherent?: Adherent;
    dateDebut?: Date;
    dateFin?: Date;
    famille?: Garantie;
}

export interface DepenseFamilleList {
    depenseFamilles: Array<DepenseFamille>;
}