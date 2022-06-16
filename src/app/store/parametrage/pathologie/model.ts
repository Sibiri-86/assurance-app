
export interface Pathologie {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface PathologieList {
    pathologieDtoList?: Array<Pathologie>
}