
export interface Pays {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    idTypeZonePays: string,
    libelleTypeZonePays: string,
    codeTypeZonePays: string
}
export interface PaysList {
    paysDtoList?: Array<Pays>
}