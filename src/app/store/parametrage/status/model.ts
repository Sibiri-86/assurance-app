
export interface Status {
    id?: string,
    code?: string,
    libelle?: string
}
export interface StatusList {
    typeStatusDtoList?: Array<Status>
}