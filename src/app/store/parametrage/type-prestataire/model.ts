
export interface TypePrestataire {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    libelleTypeGarantie?: string,
    idTypeGarantie?: string
}
export interface TypePrestataireList {
    typePrestataireDtoList?: Array<TypePrestataire>
}