
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
    localite?: string;
    longitude?: number;
    latitude?: number;

}
export interface PrestataireList {
    prestataireDtoList?: Array<Prestataire>
}