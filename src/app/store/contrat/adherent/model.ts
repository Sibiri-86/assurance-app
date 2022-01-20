import { Groupe } from "../groupe/model";
import {PlafondSousActe} from '../../parametrage/plafond/model';
import {Genre} from '../../parametrage/genre/model';
import {QualiteAssure} from '../../parametrage/qualite-assure/model';
import {Profession} from '../../parametrage/profession/model';
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
}

export interface AdherentFamille {
   adherent?: Adherent;
   famille?: Array<Adherent>;
}

export interface AdherentList{
    adherentDtoList: Array<Adherent>;
    listeActualisee: Array<Adherent>;
}
