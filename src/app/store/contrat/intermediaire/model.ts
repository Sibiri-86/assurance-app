import {SecteurActivite} from '../../parametrage/secteur-activite/model';
import {DimensionPeriode} from '../../parametrage/dimension-periode/model';
import { Pays } from '../../parametrage/pays/model';
import { Departement } from '../../parametrage/departement/model';
import { Region } from '../../parametrage/region/model';
import { Commune } from '../../parametrage/commune/model';
import { TypeIntermediaire } from '../../parametrage/type-intermediaire/model';
import { Secteur } from '../../parametrage/secteur/model';
import { Taux } from '../../parametrage/taux/model';
import { TauxCommissionIntermediaire } from '../../parametrage/taux-commission-intermediaire/model';
import { Banque } from '../../parametrage/Banques/model';

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
    taux?: TauxCommissionIntermediaire,
    secteur?: Secteur,
    banque1?: Banque,
    banque2?: Banque
}

export interface IntermediaireList{
    intermediaireDtoList: Array<Intermediaire>
}
