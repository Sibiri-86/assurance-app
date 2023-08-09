import { ExerciceComptable } from '../../comptabilite/exercice-comptable/model';
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
    pathologies?: Array<TypePrestataire>;
    tranches?: Array<Tranche>;
    display?: Boolean;
    taux?: number;
}

export interface Tranche  {
    age1?: number;
    age2?: number;
    libelle?: string;
}
export interface Bilan {
    exerciceComptable?: ExerciceComptable;
}
export interface DepenseFamilleList {
    depenseFamilles: Array<DepenseFamille>;
}