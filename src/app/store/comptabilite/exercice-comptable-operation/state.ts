import { Operation } from "../operation/model";
import { ExerciceComptableOperation } from "./model";

export interface ExerciceComptableOperationState {
    exerciceComptableOperationList: Array<ExerciceComptableOperation>
    operationList: Array<Operation>;
}