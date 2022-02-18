import {CheckTierPayantReponse, CheckTierPayantResult, OrdreReglementTierPayant, SinistreTierPayant} from './model';
import {Prefinancement} from '../prefinancement/model';

export interface SinistreTierPayantState {
    sinsitreTierPayantList: Array<SinistreTierPayant>;
    reportFile: ArrayBuffer;
    ordreReglementTierPayantList: Array<OrdreReglementTierPayant>;
    checkTierPayantReponse: Array<CheckTierPayantResult>;
}
