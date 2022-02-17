import {Adherent, AdherentFamille} from '../adherent/model';
import {Groupe} from '../groupe/model';
import {Police} from '../police/model';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../parametrage/plafond/model';
import {Acte} from '../../parametrage/acte/model';
import {SousActe} from '../../parametrage/sous-acte/model';
import {Plafond, PlafondGroupe} from '../plafond/model';
import {Garantie} from '../../parametrage/garantie/model';
import {DimensionPeriode} from '../../parametrage/dimension-periode/model';
import {Taux} from '../../parametrage/taux/model';
import {QualiteAssure} from '../../parametrage/qualite-assure/model';
import {TypePrime} from '../../parametrage/type-prime/model';
import {Territorialite} from '../../parametrage/territorialite/model';
import {Commune} from '../../parametrage/commune/model';
import {Prime} from '../prime/model';
import {Exercice} from '../exercice/model';

export interface HistoriqueAvenant {
    id?: string;
    police?: Police;
    typeHistoriqueAvenant?: TypeHistoriqueAvenant;
    aderants?: Array<AdherentFamille>;
    groupe?: Groupe;
    historiqueAvenantAdherants?: Array<HistoriqueAvenantAdherant>;
    historiqueAvenantAdherant1s?: Array<HistoriqueAvenantAdherant>;
    numero?: number;
    numeroGarant?: number;
    dateAvenant?: Date;
    file?: FormData;
    fileToLoad?: File;
    valide?: boolean;
    validePrime?: boolean;
    observation?: string;
    typeDemandeur?: TypeDemandeur;
    dateEffet?: Date;
    dateEcheance?: Date;
    historiqueAvenantPrimes?: HistoriqueAvenantPrime[];
    fraisAccessoires?: number;
    fraisBadges?: number;
    exercice?: Exercice;
    dateSuspension?: Date;
    dateResiliation?: Date;
}

export enum TypeEtat {
    AVANT_PROJET = 'AVANT_PROJET',
    AFFAIRE_NOUVELLE = 'AFFAIRE_NOUVELLE',
    RETRAIT = 'RETRAIT',
    INCORPORATION = 'INCORPORATION'
}

export enum TypeHistoriqueAvenant {
    RENOUVELLEMENT = 'RENOUVELLEMENT',
    MODIFICATION = 'MODIFICATION',
    RETRAIT = 'RETRAIT',
    INCORPORATION = 'INCORPORATION',
    AFAIRE_NOUVELLE = 'AFAIRE_NOUVELLE',
    RESILIATION = 'RESILIATION',
    SUSPENSION = 'SUSPENSION',
}

export interface HistoriqueAvenantAdherant {
    id?: string;
    avenant?: HistoriqueAvenant;
    aderants?: Array<Adherent>;
    dateEntree?: Date;
    dateIncorporation?: Date;
    dateRetrait?: Date;
    dateModification?: Date;
    dateRenouvellement?: Date;
    historiqueAvenant?: HistoriqueAvenant;
    adherent?: Adherent;
    deleted?: boolean;
    selected?: boolean;
    dateEcheance?: Date;
}

export interface HistoriqueAvenantList {
    historiqueAvenantList?: Array<HistoriqueAvenant>;
    historiqueAvenantListWithoutActive?: Array<HistoriqueAvenant>;
}

export class AvenantModification {
    adherants?: Array<Adherent>;
    groupes?: Array<Groupe>;
}

export class Avenant {
    police?: Police;
    adhrents?: Adherent[];
    historiqueAvenantAdherants?: HistoriqueAvenantAdherant[];
    historiqueAvenantAdherantDels?: HistoriqueAvenantAdherant[];
    groupe?: Groupe;
    historiqueAvenant?: HistoriqueAvenant;
    historiquePlafondGroupe?: HistoriquePlafond;
    historiquePlafondGroupeActes?: HistoriquePlafondActe[];
    historiquePlafondGroupeSousActes?: HistoriquePlafondSousActe[];
    historiquePlafondFamilleActes?: HistoriquePlafondFamilleActe[];
    familles?: AdherentFamille[];
    historiqueGroupeDto?: HistoriqueGroupe;
    plafondFamilleActes?: PlafondFamilleActe[];
    plafondGroupeActes?: PlafondActe[];
    plafondGroupeSousActes?: PlafondSousActe[];
    plafondGroupe?: any;
}

export class HistoriqueGroupe {
    id?: string;
    libelle?: string;
    description?: string;
    taux?: Taux;
    typePrime?: TypePrime;
    territorialite?: Territorialite;
    duree?: number;
    dateEffet?: Date;
    dateEcheance?: Date;
    dateSaisie?: Date;
    dateValidation?: Date;
    numeroExercice?: number;
    adresse?: string;
    commune?: Commune;
    police?: Police;
    prime?: Prime;
    adherentFamille?: AdherentFamille;
    groupeId?: string;
    historiqueAvenant?: HistoriqueAvenant;
}

export class HistoriquePlafondFamilleActe {
    garantie?: Garantie;
    montantPlafond?: number;
    dimensionPeriode?: DimensionPeriode;
    dateEffet?: Date;
    taux?: Taux;
    nombre?: number;
    listeActe?: Array<PlafondActe>;
    domaine?: Array<QualiteAssure>;
    historiqueAvenant?: HistoriqueAvenant;
}

export interface HistoriquePlafondActe {
    id?: string;
    acte?: Acte;
    montantPlafond?: number;
    dateEffet?: Date;
    taux?: Taux;
    dimensionPeriode?: DimensionPeriode;
    nombre?: number;
    listeSousActe?: Array<PlafondSousActe>;
    historiqueAvenant?: HistoriqueAvenant;
}

export interface HistoriquePlafondSousActe {
    id?: string;
    sousActe?: SousActe;
    taux?: Taux;
    dateEffet?: Date;
    montantPlafond?: number;
    dimensionPeriode?: DimensionPeriode;
    nombre?: number;
    historiqueAvenant?: HistoriqueAvenant;
}

export interface HistoriquePlafond {
    id?: string;
    domaine?: QualiteAssure;
    plafondAnnuelleFamille?: number;
    plafondGlobalInternationnal?: number;
    plafondAnnuellePersonne?: number;
    plafondFamilleActe?: Array<PlafondFamilleActe>;
    groupe?: Groupe;
    historiqueAvenant?: HistoriqueAvenant;
}

export interface HistoriqueAvenantPrime {
    id?: string;
    typePrime?: TypePrime;
    primeFamille?: number;
    primeAdulte?: number;
    primeEnfant?: number;
    primeEmploye?: number;
    primeConjoint?: number;
    primeAnnuelle?: number;
    primePersonne?: number;
    primeNet?: number;
    primeTotal?: number;
    deleted?: boolean;
    historiqueAvenant?: HistoriqueAvenant;
    groupe?: Groupe;
    fraisBadge?: number;
    fraisAccessoir?: number;
    primeTTC?: number;
    taxeTTC?: number;
    status?: boolean;
}

export enum TypeDemandeur {
    VIMSO = 'VIMSO',
    SOUSCRIPTEUR = 'SOUSCRIPTEUR',
    GARANT = 'GARANT',
}
