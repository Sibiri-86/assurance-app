
export interface QualiteAssure {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface QualiteAssureList {
    typeQualiteAssureDtoList?: Array<QualiteAssure>
}