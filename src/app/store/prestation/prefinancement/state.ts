import { CheckPlafondResponse, CheckPrefinancementResult, OrdreReglement, Prefinancement } from './model';

export interface PrefinancementState {
    prefinancementList: Array<Prefinancement>;
    ordreReglementList: Array<OrdreReglement>;
    reportFile: ArrayBuffer;
    checkPrefinancementReponse: Array<CheckPrefinancementResult>;
    montantPlafondSousActe: number;
}
