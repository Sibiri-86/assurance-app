import {SecteurActivite} from '../../parametrage/secteur-activite/model';
import {DimensionPeriode} from '../../parametrage/dimension-periode/model';
import { Pays } from '../../parametrage/pays/model';
import { Departement } from '../../parametrage/departement/model';
import { Region } from '../../parametrage/region/model';
import *as typeGarant from '../../parametrage/garant/model';
import { Commune } from '../../parametrage/commune/model';
export interface Garant{
    id?: string,
    nom?: string,
    code?: string,
    contact?: string,
    adresseEmail?: string,
    adressePostale?: string,
    personneRessource1?: string,
    contactPersonneRessource1?: string,
    emailPersonneRessource2?: string,
    emailPersonneRessource1?: string,
    personneRessource2?: string,
    contactPersonneRessource2?: string,
    numeroCompteBancaire1?: string,
    numeroCompteBancaire2?: string,
    secteurActivite?: SecteurActivite,
    numeroIfu?: string,
    periodiciteAppelFond?: DimensionPeriode,
    typeGarant?: typeGarant.Garant,
    pays?:Pays,
    province?:Departement,
    region?:Region,
    commune?:Commune,
    rccm?: string
}

export interface GarantList{
    garantDtoList: Array<Garant>
}
