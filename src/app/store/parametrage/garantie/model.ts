import { Acte } from "../acte/model"

export interface Garantie {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    actes?: Acte[],
}
export interface GarantieList {
    typeGarantieDtoList: Array<Garantie>
}