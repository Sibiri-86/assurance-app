
export interface ProduitPharmaceutique {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    /**ajout pour bon de prise en charge */
    idProduitPharmaceutique?: string;
}
export interface ProduitPharmaceutiqueList {
    produitPharmaceutiqueDtoList?: Array<ProduitPharmaceutique>;
}
