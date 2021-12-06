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
    historiquePlafondGroupeSousActe: []
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setHistoriqueAvenant, (state, payload: any) => ({
    ...state, adherentList: payload.historiqueAvenantList
  }))
);

export function reducer(state: HistoriqueAvenantState | undefined, action: Action) {
  return featureReducer(state, action);
}
