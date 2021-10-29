
export interface Profession {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
    IdTypeCategorieSocioProfessionnel?: string
    libelleTypeCategorieSocioProfessionnel?: string
}
export interface ProfessionList {
    typeProfessionDtoList?: Array<Profession>
}