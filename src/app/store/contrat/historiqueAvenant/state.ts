import {
    HistoriqueAvenant,
    HistoriquePlafond,
    HistoriquePlafondActe,
    HistoriquePlafondFamilleActe,
    HistoriquePlafondSousActe
} from './model';

export interface HistoriqueAvenantState {
    historiqueAvenantList: Array<HistoriqueAvenant>;
    historiquePlafondGroupe: Array<HistoriquePlafond>;
    historiquePlafondGroupeFamilleActe: Array<HistoriquePlafondFamilleActe>;
    historiquePlafondGroupeActe: Array<HistoriquePlafondActe>;
    historiquePlafondGroupeSousActe: Array<HistoriquePlafondSousActe>;
    historiqueAvenantListWithoutActive: Array<HistoriqueAvenant>;
    historiqueAvenantListByExercie: Array<HistoriqueAvenant>;
}
