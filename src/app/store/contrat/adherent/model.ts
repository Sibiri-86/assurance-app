import { Groupe } from "../groupe/model";
import {PlafondSousActe} from '../../parametrage/plafond/model';
export interface Adherent{
    id?: string,
    nom?: string,
    prenom?: string,
    dateNaissance?: Date,
    lieuNaissance?: string,
    numeroTelephone?: string,
    adresse?: string,
    adresseEmail?: string,
    profession?: string,
    referenceBancaire?: string,
    qualiteAssure?: string,
    genre?: string,
    dateIncorporation?: string,
    dateIncor?: Date,
    dateEntree?: Date,
    groupe?: Groupe,
    adherentPrincipal?: Adherent;
    plafondGroupeSousActe?: PlafondSousActe;
}

export interface AdherentFamille {
   adherent?: Adherent;
   famille?: Array<Adherent>;
}

export interface AdherentList{
    adherentDtoList: Array<Adherent>;
}