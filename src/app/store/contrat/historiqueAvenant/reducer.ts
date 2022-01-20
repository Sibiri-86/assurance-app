import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import {HistoriqueAvenantState} from './state';
import {
    HistoriquePlafond,
    HistoriquePlafondActe,
    HistoriquePlafondFamilleActe,
    HistoriquePlafondSousActe
} from './model';

const initialState: HistoriqueAvenantState = {
    historiqueAvenantList: [],
    historiquePlafondGroupe: [],
    historiquePlafondGroupeFamilleActe: [],
    historiquePlafondGroupeActe: [],
    historiquePlafondGroupeSousActe: [],
    historiqueAvenantListWithoutActive: []
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setHistoriqueAvenant, (state, payload: any) => ({
    ...state, historiqueAvenantList: payload.historiqueAvenantList
  })),
    on(featureActions.setHistoriqueAvenant, (state, payload: any) => ({
        ...state, historiqueAvenantListWithoutActive: payload.historiqueAvenantListWithoutActive
      }))
);

export function reducer(state: HistoriqueAvenantState | undefined, action: Action) {
  return featureReducer(state, action);
}
