
export interface Departement {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
    idRegion?: string
    idTypeCommune?: string
    libelleRegion?: string
    libelleCommune?: string
}
export interface DepartementList {
    departementDtoList?: Array<Departement>
}