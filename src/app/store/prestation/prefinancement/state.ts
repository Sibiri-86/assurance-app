import {  CheckPrefinancementResult, MontantPlafondGarantieResponse, OrdreReglement, Prefinancement, ReponseCheckMontantRestantGarantie } from './model';

export interface PrefinancementState {
    prefinancementList: Array<Prefinancement>;
    ordreReglementList: Array<OrdreReglement>;
    reportFile: ArrayBuffer;
    checkPrefinancementReponse: Array<CheckPrefinancementResult>;
    montantPlafondSousActe: number;
    selectedMontantResearch: ReponseCheckMontantRestantGarantie;
}
