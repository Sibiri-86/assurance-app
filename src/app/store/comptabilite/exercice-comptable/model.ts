
export interface ExerciceComptable {
    id?: string,
    annee?: number;
    actived?: boolean;
   
}
export interface  ExerciceComptableList {
    exerciceComptableList: Array<ExerciceComptable>
}