export interface Alerte{
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface AlerteList {
    alerteDtoList?: Array<Alerte>;
}