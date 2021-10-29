
export interface Acte {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    libelleTypeGarantie?: string,
    idTypeGarantie?: string
}
export interface ActeList {
    typeActeDtoList?: Array<Acte>
}