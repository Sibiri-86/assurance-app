import {SecteurActivite} from '../../parametrage/secteur-activite/model';
import {DimensionPeriode} from '../../parametrage/dimension-periode/model';
import { Pays } from '../../parametrage/pays/model';
import { Departement } from '../../parametrage/departement/model';
import { Region } from '../../parametrage/region/model';
import { Commune } from '../../parametrage/commune/model';
import { TypeIntermediaire } from '../../parametrage/type-intermediaire/model';

export interface Intermediaire {
    id?: string,
    nom?: string,
    code?: string,
    contact?: string,
    adresseEmail?: string,
    adressePostale?: string,
    typeIntermediaire?: TypeIntermediaire,
    personneRessource?: string,
    numeroCompteBancaire1?: string,
    numeroCompteBancaire2?: string,
    numeroIfu?: string,
    periodiciteAppelFond?: DimensionPeriode,
    rccm?: string,
    pays?:Pays,
    province?:Departement,
    region?:Region,
    commune?:Commune,
}

export interface IntermediaireList{
    intermediaireDtoList: Array<Intermediaire>
}
