import { Bareme, Plafond } from "./model";
export interface PlafondState {
    plafondList: Array<Plafond>
    plafondGroupe: Plafond
    baremeList: Array<Bareme>
}