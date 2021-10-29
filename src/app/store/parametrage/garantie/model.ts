export interface Garantie {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
}
export interface GarantieList {
    typeGarantieDtoList: Array<Garantie>
}