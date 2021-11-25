import {Adherent, AdherentFamille} from '../adherent/model';
import {Groupe} from '../groupe/model';
import {Police} from '../police/model';

export interface HistoriqueAvenant {
    id?: string;
    police?: Police;
    typeHistoriqueAvenant?: TypeHistoriqueAvenant;
    aderants?: Array<AdherentFamille>;
    groupe?: Groupe;
    historiqueAvenantAdherants: Array<HistoriqueAvenantAdherant>;
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
    INCORPORATION = 'INCORPORATION'
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
    deleted: boolean;
    selected: boolean;
}

export interface HistoriqueAvenantList {
    historiqueAvenantList?: Array<HistoriqueAvenant>;
}
