import { OrdreReglementTierPayant } from "../prestation/tierPayant/model";
import { Compte } from "./compte/model";

export interface ReceteTotalDepenseTotalOrdreReglementTierPayant{
    
    recetteTotal?: boolean;
    depenseTotal?: boolean;
    montant?: number;
    isReccette?: boolean;
    isDepense?: boolean;
    date?: Date;
    compte?: Compte;
    ordreReglementTierPayant?: OrdreReglementTierPayant;
}