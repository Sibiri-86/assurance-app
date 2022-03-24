import { Adherent } from '../../contrat/adherent/model';
import { TypeReport } from '../../contrat/enum/model';
import { Prestataire } from '../../parametrage/prestataire/model';
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
    adherent?: Adherent;
    prestataire?:Prestataire;
    prescripteur?: Prestataire;
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

export interface OrdonnanceMedicalProduitPharmaceutiqueList{
    ordonnaceMedicalProduitPharmaceutiqueDTOList?: Array<OrdonnanceMedical>;
}

export interface Report {
    typeReporting?: TypeReport;
    ordonnance?: OrdonnanceMedical;
}

export interface ReportFile {
    reportFile?: ArrayBuffer;
}

