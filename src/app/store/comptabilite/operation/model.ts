import { OrdreReglement } from "../../prestation/prefinancement/model";
import { OrdreReglementTierPayant } from "../../prestation/tierPayant/model";
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
    journauxId?: string;
    ordreReglement?: OrdreReglement;
    ordreReglementTierpayant?: OrdreReglementTierPayant;
    montantRecette?: number;
    montantDepense?: number;
    solde?: number;
    beneficiaire?: string;
    datefin?: Date;
   
}
export interface  OperationList {
    operationList: Array<Operation>
}