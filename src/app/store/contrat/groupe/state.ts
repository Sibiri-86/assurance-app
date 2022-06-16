import { Rapport } from '../police/model';
import { Groupe } from './model';
export interface GroupeState {
    groupeList: Array<Groupe>;
    rapport: Rapport;
}