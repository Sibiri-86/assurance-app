
import { Garant } from "../garant/model";
import { Intermediaire } from "../intermediaire/model";
import { Territorialite } from "../../parametrage/territorialite/model";
import {SecteurActivite} from '../../parametrage/secteur-activite/model';
import {DimensionPeriode} from '../../parametrage/dimension-periode/model';
import { Pays } from '../../parametrage/pays/model';
import { Departement } from '../../parametrage/departement/model';
import { Region } from '../../parametrage/region/model';
import { Commune } from '../../parametrage/commune/model';
import { Taux } from "../../parametrage/taux/model";
import { Secteur } from "../../parametrage/secteur/model";

export interface Police{
    id?: string,
    garant?: Garant,
    intermediaire?: Intermediaire,
    taux?: Taux,
    territorialite?:  Array<Territorialite>,
    duree?: number,
    dateEffet?: Date,
    dateEcheance?: Date,
    dateSaisie?: Date;
    dateValidation?: Date,
    adressePostale?: string,
    referencePolice?: string,
    typeDuree?: string,
    nom?: string,
    code?: string,
    contact?: string,
    adresseEmail?: string,
    personneRessource?: string,
    contactPersonneRessource?: string,
    emailPersonneRessource?: string,
    secteurActivite?: SecteurActivite,
    numeroIfu?: string,
    secteur?:Secteur,
    rccm?: string,
    fraisAccessoire?: number,
    fraisBadge?: number
}

export interface PoliceList {
    policeDtoList: Array<Police>
}
