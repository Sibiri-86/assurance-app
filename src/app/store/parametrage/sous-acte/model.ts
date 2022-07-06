export interface SousActe {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    libelleTypeActe?: string;
    idTypeActe?: string;
    libelleGenre?: string;
    idGenre?: string;
    montantConvantion?: number;
    dateEffet?: Date;
}
export interface SousActeList {
    typeSousActeDtoList?: Array<SousActe>;
}