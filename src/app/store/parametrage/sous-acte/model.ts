export interface SousActe {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    libelleTypeActe?: string;
    idTypeActe?: string;
    montantConvantion?: number;
}
export interface SousActeList {
    typeSousActeDtoList?: Array<SousActe>;
}