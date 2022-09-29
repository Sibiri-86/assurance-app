import { Garant } from "../../contrat/garant/model";
import { Pays } from "../../parametrage/pays/model";
import { Region } from "../../parametrage/region/model";
import { Ville } from "../../parametrage/ville/model";
import { Compte } from "../compte/model";

export interface Tiers {
    id?: string;
    compteTiers?: string;
    intitule?: string;
    abrege?: string;
    compteCollectif?: Compte;
    typeCompteTiers?: TypeCompteTiers;
    Description?: string;
    interlocuteur?: string;
    adresse?:Garant;
    codePostal?: string;
    isDeleted?: boolean;
    /* pays?: Pays;
    region?: Region;
    ville?: Ville; */
    numTel?: string;

}


export interface TiersList{
    tiersDTOList: Array<Tiers>; 
}


export enum TypeCompteTiers {
    TOUS = 'TOUS',
    CLIENT = 'CLIENT',
    FOURNISSEUR = 'FOURNISSEUR',
    SALARIE = 'SALARIE',
    AUTRES = 'AUTRES'
}

