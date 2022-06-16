export interface SecteurActivite {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
}
export interface SecteurActiviteList {
    secteurActiviteDtoList: Array<SecteurActivite>
}