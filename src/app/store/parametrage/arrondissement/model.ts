export interface Arrondissement {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    idCommune?: string
}
export interface ArrondissementList {
    arrondissementDtoList?: Array<Arrondissement>
}