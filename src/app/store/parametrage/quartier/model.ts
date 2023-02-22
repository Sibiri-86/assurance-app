
export interface Quartier {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
}
export interface QuartierList {
    quartierDtoList: Array<Quartier>
}