import { Garant } from '../garant/model';
import { Intermediaire } from '../intermediaire/model';
import { Territorialite } from '../../parametrage/territorialite/model';
import {SecteurActivite} from '../../parametrage/secteur-activite/model';
import { Taux } from '../../parametrage/taux/model';
import { Secteur } from '../../parametrage/secteur/model';
import {TypeDuree, TypeReport} from '../enum/model';
import {HistoriqueAvenant} from '../historiqueAvenant/model';
import { TauxCommissionIntermediaire } from '../../parametrage/taux-commission-intermediaire/model';
import { OrdreReglement, Prefinancement } from '../../prestation/prefinancement/model';
import {OrdreReglementTierPayant, SinistreTierPayant} from '../../prestation/tierPayant/model';
import {Groupe} from '../groupe/model';
import { OrdonnanceMedical } from '../../medical/ordonnance-medical/model';
import { Pays } from '../../parametrage/pays/model';
import { Region } from '../../parametrage/region/model';
import { Arrondissement } from '../../parametrage/arrondissement/model';
import { Departement } from '../../parametrage/departement/model';

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
    nom?: string;
    tauxCommissionIntermediaire?: TauxCommissionIntermediaire;
    code?: string;
    contact?: string;
    adresseEmail?: string;
    personneRessource?: string;
    contactPersonneRessource?: string;
    emailPersonneRessource?: string;
    secteurActivite?: SecteurActivite;
    numeroIfu?: string;
    secteur?: Secteur;
    pays?: Pays;
    region?: Region;
    arrondissement?: Arrondissement;
    departement?: Departement;
    rccm?: string;
    fraisAccessoire?: number;
    fraisBadge?: number;
    valide?: boolean;
    numero?: string;
    historiqueAvenantListWithoutActiveList?: HistoriqueAvenant[];
    listGroupe?: Groupe[];
    typeDuree?: TypeDuree;
}

export interface Statistique {
    nombreGarant?: number;
    nombreIntermediaire?: number;
    nombrePolice?: number;
    nombreSouscripteur?: number;
    nombreAssure?: number;
}

export interface Rapport {
    nombreConjoint?: number;
    nombreEnfant?: number;
    nombreAdherent?: number;
    nombreFeminin?: number;
    nombreMasculin?: number;
    total?: number;
}

export interface ReportFile {
    reportFile?: ArrayBuffer;
}

export interface Report {
    typeReporting?: TypeReport;
    police?: Police;
    historiqueAvenant?: HistoriqueAvenant;
    prefinancementDto?: Prefinancement;
    ordreReglementDto?: OrdreReglement;
    sinistreTierPayantDTO?: SinistreTierPayant;
    ordreReglementTierPayant?: OrdreReglementTierPayant;
    ordonnanceMedical?: OrdonnanceMedical;
}

export interface PoliceList {
    policeDtoList: Array<Police>;
}
