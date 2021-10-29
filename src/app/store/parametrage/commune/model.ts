
export interface Commune {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface CommuneList {
    communeDtoList?: Array<Commune>
}