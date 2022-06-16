
export interface TypeAffaire {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface TypeAffaireList {
    typeAffaireDtoList?: Array<TypeAffaire>
}