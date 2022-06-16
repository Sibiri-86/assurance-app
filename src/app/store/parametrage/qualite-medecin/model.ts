
export interface QualiteMedecin {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface QualiteMedecinList {
    qualiteMedecinDtoList?: Array<QualiteMedecin>
}