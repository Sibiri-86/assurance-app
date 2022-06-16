
export interface ModePaiement {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface ModePaiementList {
    typeModePaiementDtoList?: Array<ModePaiement>
}