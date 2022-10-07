import { ExerciceComptable } from "../exercice-comptable/model";
import { Journaux } from "../journaux/model";
import { Operation } from "../operation/model";

export interface ExerciceComptableOperation {
    id?: string,
    exercice?: ExerciceComptable;
    mois?: string;
    dateDebut?:Date;
    dateFin?: Date;
    journaux?: Journaux;
    montantDebit?: number;
    montantCredit?: number;
    solde?: number;
    reportSoldeMois?: number;
   
}
export interface  ExerciceComptableOperationList {
    exerciceComptableOperationList: Array<ExerciceComptableOperation>
}

export interface OperationList {
    operationList: Array<Operation>
}