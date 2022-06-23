import { Departement } from "../departement/model";

export interface Prestataire {
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    idTypePrestataire?: string,
    idNaturePrestataire?: string,
    libelleTypePrestataire?: string,
    libelleNaturePrestataire?: string;
    responsable?: string;
    telephone?: string;
    idDepartement?: string;
    libelleDepartement?: string;
    codeDepartement?: string;
    longitude?: number;
    latitude?: number;

}
export interface PrestataireList {
    prestataireDtoList?: Array<Prestataire>
}