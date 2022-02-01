import {OrdreReglement, SinistreTierPayant} from './model';

export interface SinistreTierPayantState {
    sinsitreTierPayantList: Array<SinistreTierPayant>;
    reportFile: ArrayBuffer;
    ordreReglementTierPayantList: Array<OrdreReglement>;
}
