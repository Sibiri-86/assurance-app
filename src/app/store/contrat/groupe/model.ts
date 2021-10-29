import { Taux } from '../../parametrage/taux/model';
import {Territorialite} from '../../parametrage/territorialite/model';
import {PlafondActe,PlafondSousActe,PlafondFamilleActe} from '../../parametrage/plafond/model';
import { TypePrime } from '../../parametrage/type-prime/model';
import { Police } from '../police/model';
import { Prime } from '../prime/model';
import { Adherent } from '../adherent/model';
import { AdherentFamille } from '../adherent/model';

export interface Groupe {
    id?: string,
    libelle?: string,
    taux?: Taux,
    territorialite?: Array<Territorialite>,
    duree?: number,
    dateEffet?: Date,
    dateEcheance?: Date,
    police?: Police,
    prime?: Prime,
    adherentFamille?: Array<AdherentFamille>
}

export interface GroupeList{
    groupeDtoList: Array<Groupe>
}
