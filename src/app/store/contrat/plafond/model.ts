import { QualiteAssure } from '../../parametrage/qualite-assure/model';
import { PlafondFamilleActe } from '../../parametrage/plafond/model';
import { Groupe } from '../groupe/model';
import { TypeBareme } from 'src/app/module/common/models/bareme.enum';
import { Taux } from '../../parametrage/taux/model';

export interface Plafond {
    id?: string;
    domaine?: QualiteAssure;
    plafondAnnuelleFamille?: number;
    plafondGlobalInternationnal?: number;
    plafondAnnuellePersonne?: number;
    plafondFamilleActe?: Array<PlafondFamilleActe>;
    groupe?: Groupe;
    plafondGlobalEvacuationSanitaire?: number;
    avenantId?: string;
}

export interface PlafondConfig {
    dtoList?: Array<PlafondFamilleActe>;
}

export interface Bareme {
    id?: string;
    libelle?: string;
    description?: string;
    typeBareme?: TypeBareme;
    taux?: Taux;
    baremeFamilleActe?: Array<PlafondFamilleActe>;
    ageMin?: number;
    ageMax?: number;
}

export interface BaremeList {
    baremeDtoList: Array<Bareme>;
}

export interface PlafondList {
    plafondDtoList: Array<Plafond>;
}

export interface PlafondGroupe {
    plafond: Plafond;
}

export interface PlafondGroupeFamilleActeListe {
    plafondGroupeFamilleActeListe?: Array<PlafondFamilleActe>;
}
