
export interface PharmacieGarde {
    id?: string;
    codePharmacie?: string;
    nom?: string;
    telephone?: string;
    responsable?: string;
    isAffilie?: string;
    longitude?: string;
    latitude?: string;
    idDateGarde?: string;
    codeDateGarde?: string;
    dateDebutD?: Date;
    dateFinF?: Date;
}
export interface PharmacieGardeList {
    pharmacieGardeDtoList?: Array<PharmacieGarde>;
}
