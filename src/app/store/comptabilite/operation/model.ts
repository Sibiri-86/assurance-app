import { OrdreReglement } from "../../prestation/prefinancement/model";
import { OrdreReglementTierPayant } from "../../prestation/tierPayant/model";
import { Compte } from "../compte/model";
import { ExerciceComptableOperation } from "../exercice-comptable-operation/model";
import { Tiers } from "../tiers/model";

export interface Operation {
    id?: string,
    numPiece?: number;
    numFacture?: string;
    reference?:string;
    libelle?:string;
    numCompte?: number;
    numCompteAuxi?: number;
    dateSaisieJour?: Date;
    dateSaisie?: Date;
    exerciceComptableOperation?: ExerciceComptableOperation;
    montantDebit?: number;
    montantCredit?: number;
    compte?: Compte;
    compteAuxiliaire?: Tiers;
    compteSelected?: Compte;
    journauxId?: string;
    ordreReglement?: OrdreReglement;
    ordreReglementTierpayant?: OrdreReglementTierPayant;
    montantRecette?: number;
    montantDepense?: number;
    solde?: number;
    beneficiaire?: string;
    dateFin?: Date;
    reportSoldeMois?: number;
    boolTotal?: boolean;
    compteAuxiliaireSelected?: Tiers;
   
}
export interface  OperationList {
    operationList: Array<Operation>
}