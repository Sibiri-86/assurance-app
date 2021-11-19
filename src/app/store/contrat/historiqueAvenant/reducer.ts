import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import {HistoriqueAvenantState} from './state';

const initialState: HistoriqueAvenantState = {
    historiqueAvenantList: [],
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
