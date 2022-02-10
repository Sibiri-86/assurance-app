import { PlafondFamilleActe } from '../../parametrage/plafond/model';
import { Bareme, Plafond } from './model';
export interface PlafondState {
    plafondList: Array<Plafond>;
    plafondGroupe: Plafond;
    baremeList: Array<Bareme>;
    plafondConfig: Array<PlafondFamilleActe>;
    plafondGroupeFamilleActeListe: Array<PlafondFamilleActe>;
}
