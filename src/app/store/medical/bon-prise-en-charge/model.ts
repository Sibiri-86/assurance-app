import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { Adherent } from '../../contrat/adherent/model';
import { TypeReport } from '../../contrat/enum/model';
import { Police } from '../../contrat/police/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { Prestation } from '../../prestation/prefinancement/model';

export interface BonPriseEnCharge {
    id?: string;
    dateDeclaration?: Date;
    adherent?: Adherent;
    prestataire?: Prestataire;
    police?: Police;
    numeros?: string;
    date?: Date;
    status?: string;
    userCurent?: string;
    prestation?: Array<Prestation>;
   typeBon?: TypeBon;
}

export interface ReportFile {
    reportFile?: ArrayBuffer;
}

export interface Report {
    typeReporting?: TypeReport;
    bonPriseEnChargeDto?: BonPriseEnCharge;
}

export interface BonPriseEnChargeList{
    bonPriseEnChargeList?: Array<BonPriseEnCharge>;
}
