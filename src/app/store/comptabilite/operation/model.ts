import { Compte } from "../compte/model";
import { ExerciceComptableOperation } from "../exercice-comptable-operation/model";

export interface Operation {
    id?: string,
    numPiece?: number;
    numFacture?: string;
    reference?:string;
    libelle?:string;
    numCompte?: number;
    numCompteAuxi?: number;
    dateSaisie?: Date;
    exerciceComptableOperation?: ExerciceComptableOperation;
    montantDebit?: number;
    montantCredit?: number;
    compte?: Compte;
    compteAuxiliaire?: Compte;
   
}
export interface  OperationList {
    operationList: Array<Operation>
}