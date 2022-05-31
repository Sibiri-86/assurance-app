import { SousActe } from "../sous-acte/model"

export interface Acte {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    libelleTypeGarantie?: string,
    idTypeGarantie?: string,
    sousActes?: SousActe[];
}
export interface ActeList {
    typeActeDtoList?: Array<Acte>
}