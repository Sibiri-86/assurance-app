
export interface Region {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    idTypePays?: string,
    libelleTypePays?: string
}
export interface RegionList {
    regionDtoList?: Array<Region>
}