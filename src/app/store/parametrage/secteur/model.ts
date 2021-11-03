export interface Secteur {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    idArrondissement?: string
}
export interface SecteurList {
    secteurDtoList?: Array<Secteur>
}