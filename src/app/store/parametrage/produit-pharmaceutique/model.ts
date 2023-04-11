
export interface ProduitPharmaceutique {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    /**ajout pour bon de prise en charge */
    idProduitPharmaceutique?: string;
    observation?: string;
    prix?: number;
}
export interface ProduitPharmaceutiqueList {
    produitPharmaceutiqueDtoList?: Array<ProduitPharmaceutique>;
}
