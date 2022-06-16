
export interface Taux {
    id?: string,
    taux?: number,
    description?: string
}
export interface TauxList {
    typeTauxDtoList?: Array<Taux>
}