import { Groupe } from "../../contrat/groupe/model";
import { Police } from "../../contrat/police/model";

export interface ProduitPharmaceutiqueExclu {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    typeProduit?: string;
    isExclu?: boolean;
    /**ajout pour bon de prise en charge */
    idProduitPharmaceutique?: string;
}

export interface ProduitPharmaceutiqueExcluEntite {
    id?: string;
    produitExclus?: Array<ProduitPharmaceutiqueExclu>;
    souscripteur?: Police;
    groupe?: Groupe;
    produitExclu?: ProduitPharmaceutiqueExclu;
}
export interface ProduitPharmaceutiqueExcluList {
    produitPharmaceutiqueExcluDtoList?: Array<ProduitPharmaceutiqueExclu>;
}

export interface ProduitPharmaceutiqueExcluEntiteList{
    pharmaceutiqueExcluEntiteDtos?: Array<ProduitPharmaceutiqueExcluEntite>;
}

