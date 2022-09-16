import { ExerciceComptable } from "../exercice-comptable/model";
import { Journaux } from "../journaux/model";

export interface ExerciceComptableOperation {
    id?: string,
    exercice?: ExerciceComptable;
    mois?: string;
    dateDebut?:Date;
    dateFin?: Date;
    journaux?: Journaux
   
}
export interface  ExerciceComptableOperationList {
    exerciceComptableOperationList: Array<ExerciceComptableOperation>
}