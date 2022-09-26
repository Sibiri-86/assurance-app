import { ExerciceComptable } from "../exercice-comptable/model";
import { Journaux } from "../journaux/model";

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
   
}
export interface  ExerciceComptableOperationList {
    exerciceComptableOperationList: Array<ExerciceComptableOperation>
}