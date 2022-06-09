
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

}
export interface PrestataireList {
    prestataireDtoList?: Array<Prestataire>
}