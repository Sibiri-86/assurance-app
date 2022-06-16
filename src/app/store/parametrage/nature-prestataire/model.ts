
export interface NaturePrestataire {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface NaturePrestataireList {
    naturePrestataireDtoList?: Array<NaturePrestataire>
}