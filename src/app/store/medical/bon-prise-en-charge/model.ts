import { TypeReport } from '../../contrat/enum/model';
import { Prestation } from '../../prestation/prefinancement/model';

export interface BonPriseEnCharge {
    id?: string;
    dateDeclaration?: Date;
    idAdherent?: string;
    idPrestataire?: string;
    idPolice?: string;
    nom?: string;
    numeros?: string;
    date?: Date;
    prenom?: string;
    nomPrestataire?: string;
    prestations?: Array<Prestation>;
    dateNaissance?: Date;
    lieuNaissance?: string;
    numeroTelephone?: string;
    adresse?: string;
    numeroPolice?: string;
    nomSouscripteur?: string;
    adresseSouscripteur?: string;
    dateEffet?: Date;
    dateEcheance?: Date;
    typeQualiteAssure?: string;
}

export interface ReportFile {
    reportFile?: ArrayBuffer;
}

export interface Report {
    typeReporting?: TypeReport;
    bon?: BonPriseEnCharge;
}

export interface BonPriseEnChargeList{
    bonPriseEnChargeList?: Array<BonPriseEnCharge>;
}
