import { Adherent } from '../../contrat/adherent/model';
import { Garant } from '../../contrat/garant/model';
import { Groupe } from '../../contrat/groupe/model';
import { Police } from '../../contrat/police/model';
import { Garantie } from '../../parametrage/garantie/model';
import { TypePrestataire } from '../../parametrage/type-prestataire/model';

import { Prestation } from '../../prestation/tierPayant/model';

export interface DepenseFamille {
     adherent?: Adherent;
     prestationList?: Array<Prestation>;
     familleActe?: Garantie;
     nombreActe?: number;
     montantRembourse?: number;
    coutMoyen?: number;
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
    groupe?: Groupe;
    typePrestataire?: Array<TypePrestataire>;
}

export interface DepenseFamilleList {
    depenseFamilles: Array<DepenseFamille>;
}