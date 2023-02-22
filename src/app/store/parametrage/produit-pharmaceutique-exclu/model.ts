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
    code?: string;
    libelle?: string;
    description?: string;
    typeProduit?: string;
    isExclu?: boolean;
    police?: Police;
    groupe?: Groupe;
    /**ajout pour bon de prise en charge */
    idProduitPharmaceutique?: string;
}
export interface ProduitPharmaceutiqueExcluList {
    produitPharmaceutiqueExcluDtoList?: Array<ProduitPharmaceutiqueExclu>;
}
