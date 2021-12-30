import { Taux } from '../../parametrage/taux/model';
import {Territorialite} from '../../parametrage/territorialite/model';
import { TypePrime } from '../../parametrage/type-prime/model';
import { Police } from '../police/model';
import { Prime } from '../prime/model';
import { AdherentFamille } from '../adherent/model';
import { Commune } from '../../parametrage/commune/model';

export interface Groupe {
    id?: string;
    libelle?: string;
    numeroGroupe?: number;
    taux?: Taux;
    territorialite?: Array<Territorialite>;
    duree?: number;
    dateEffet?: Date;
    adresse?: string;
    commune?: Commune;
    dateEcheance?: Date;
    police?: Police;
    typePrime?: TypePrime;
    prime?: Prime;
    description?: string;
    adherentFamille?: Array<AdherentFamille>;
    groupeId?: string;
    listGroupe?: Array<Groupe>;
}

export interface GroupeList{
    groupeDtoList: Array<Groupe>;
}
