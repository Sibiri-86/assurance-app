
export interface ExerciceComptable {
    id?: string,
    annee?: number;
    actived?: boolean;
    cloture?: boolean;
   
}
export interface  ExerciceComptableList {
    exerciceComptableList: Array<ExerciceComptable>
}