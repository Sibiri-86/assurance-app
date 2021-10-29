
export interface Garant {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    libelleTypeGarantie?: string,
    idTypeGarantie?: string
}
export interface GarantList {
    typeGarantDtoList?: Array<Garant>
}