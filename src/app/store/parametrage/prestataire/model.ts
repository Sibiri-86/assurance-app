import { Commune } from "../commune/model";
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
    codeQuartier?: string;
    libelleQuartier?: string;
    idQuartier?: string;
    situationGeographique?: string;
    quartier?: string;
    telephone2?: string ;

}
export interface PrestataireList {
    prestataireDtoList?: Array<Prestataire>
}

export interface MajPrestataireDto {
    commune?: Commune;
    quartier?: string;
    situationGeographique?: string;
    prestataires?: Array<Prestataire>;
}