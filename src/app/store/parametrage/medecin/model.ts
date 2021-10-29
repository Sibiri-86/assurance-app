
export interface Medecin {
    id?: string,
    nom?: string,
    prenom?: string,
    description?: string
    idQualiteMedecin?: string
    libelleQualiteMedecin?: string
}
export interface MedecinList {
    medecinDtoList?: Array<Medecin>
}