
import { Garant } from '../garant/model';
import { Intermediaire } from '../intermediaire/model';
import { Territorialite } from '../../parametrage/territorialite/model';
import {SecteurActivite} from '../../parametrage/secteur-activite/model';
import { Taux } from '../../parametrage/taux/model';
import { Secteur } from '../../parametrage/secteur/model';
import {Adherent, AdherentFamille} from "../adherent/model";
import {Groupe} from "../groupe/model";

export interface Police{
    id?: string;
    garant?: Garant;
    intermediaire?: Intermediaire;
    taux?: Taux;
    territorialite?: Array<Territorialite>;
    duree?: number;
    dateEffet?: Date;
    dateEcheance?: Date;
    dateSaisie?: Date;
    dateValidation?: Date;
    adressePostale?: string;
    referencePolice?: string;
    typeDuree?: string;
    nom?: string;
    code?: string;
    contact?: string;
    adresseEmail?: string;
    personneRessource?: string;
    contactPersonneRessource?: string;
    emailPersonneRessource?: string;
    secteurActivite?: SecteurActivite;
    numeroIfu?: string;
    secteur?: Secteur;
    rccm?: string;
    fraisAccessoire?: number;
    fraisBadge?: number;
    valide?: boolean;
}

export interface PoliceList {
    policeDtoList: Array<Police>;
}
