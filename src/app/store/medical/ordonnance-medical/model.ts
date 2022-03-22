import { ProduitPharmaceutique } from '../../parametrage/produit-pharmaceutique/model';

export interface OrdonnanceMedicalProduitPharmaceutique {
    id?: number;
    dateSaisie?: Date;
    typeQuantite?: TypeQuantite;
    quantite?: string;
    observation?: string;
    pharmaceutique?: ProduitPharmaceutique;
    ordonnaceMedical?: OrdonnanceMedical;
}

export interface OrdonnanceMedical{
    id?: number;
    dateSaisie?: Date;
    idAdherent?: string;
    idPrestataire?:string;
    idPrescripteur?: string;
    ordonnanceMedicalProduitPharmaceutiques?: Array<OrdonnanceMedicalProduitPharmaceutique>;
}

export enum TypeQuantite {
    BOITE = 'BOITE',
    PAQUET = 'PAQUET',
    PLAQUETTE = 'PLAQUETTE',
    FLACON = 'FLACON',
    TUBE = 'TUBE',
    UNITAIRE = 'UNITAIRE',
}

/* export interface ReportFile {
    reportFile?: ArrayBuffer;
}

export interface Report {
    typeReporting?: TypeReport;
    bon?: BonPriseEnCharge;
}

export interface BonPriseEnChargeList{
    bonPriseEnChargeList?: Array<BonPriseEnCharge>;
} */
