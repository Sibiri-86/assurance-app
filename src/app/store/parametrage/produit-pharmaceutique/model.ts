
export interface ProduitPharmaceutique {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface ProduitPharmaceutiqueList {
    produitPharmaceutiqueDtoList?: Array<ProduitPharmaceutique>
}