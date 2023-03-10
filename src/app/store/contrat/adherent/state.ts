import { Adherent, ConditionGenerale } from "./model";
export interface AdherentState {
    adherentList: Array<Adherent>;
    selectedAdherentResearch: Adherent;
    listeActualisee: Array<Adherent>;
    conditionGeneraleDtoList: Array<ConditionGenerale>;

}

