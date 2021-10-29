
export interface Ville {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface VilleList {
    villeDtoList?: Array<Ville>
}