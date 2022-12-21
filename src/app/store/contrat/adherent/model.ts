import { Groupe } from "../groupe/model";
import {PlafondFamilleActe, PlafondSousActe} from '../../parametrage/plafond/model';
import {Genre} from '../../parametrage/genre/model';
import {QualiteAssure} from '../../parametrage/qualite-assure/model';
import {Profession} from '../../parametrage/profession/model';
import { Exercice } from "../exercice/model";
import { Questionnaire } from "../bulletin-adhesion/model";
export interface Adherent{
    id?: string;
    matriculeGarant?: string;
    matricule?: string;
    nomAdherent?: string;
    nom?: string;
    prenom?: string;
    dateNaissance?: Date;
    lieuNaissance?: string;
    numeroTelephone?: string;
    numero?: number;
    adresse?: string;
    adresseEmail?: string;
    profession?: Profession;
    referenceBancaire?: string;
    qualiteAssure?: QualiteAssure;
    genre?: Genre;
    dateIncorporation?: string;
    dateIncor?: Date;
    dateEntree?: Date;
    groupe?: Groupe;
    adherentPrincipal?: Adherent;
    plafondGroupeSousActe?: PlafondSousActe;
    matriculeSouscripteur?: string;
    fullName?: string;
    urlPhoto?: string;
    manageIncorporation?: number;
    signeAdherent?: string;
    dateSortie?:Date;
    dateSuspension?:Date;
    deleted?: boolean;
    actif?: boolean;
    exercice?: Exercice;
    ancienGroupes?: Array<Groupe>;
    question?: Questionnaire;
    numeroWhap?: string;
    compteBancaire?: string;
}

export interface AdherentResearchReponse {
    adherent?: Adherent;
    plafondFamilleActeDtoList?: Array<PlafondFamilleActe>;
}
export interface AdherentFamille {
   adherent?: Adherent;
   famille?: Array<Adherent>;
}

export interface AdherentList{
    adherentDtoList: Array<Adherent>;
    listeActualisee: Array<Adherent>;
}
