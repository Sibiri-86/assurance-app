
export interface Commune {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    idDepartement?: string
}
export interface CommuneList {
    communeDtoList?: Array<Commune>
}