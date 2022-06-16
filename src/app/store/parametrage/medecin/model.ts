
export interface Medecin {
    id?: string,
    nom?: string,
    prenom?: string,
    description?: string,
    idQualiteMedecin?: string,
    libelleQualiteMedecin?: string,
    idPrestatire?: string,
    libellePrestataire?: string
}
export interface MedecinList {
    medecinDtoList?: Array<Medecin>
}