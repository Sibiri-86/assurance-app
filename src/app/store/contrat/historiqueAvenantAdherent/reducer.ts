import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import {HistoriqueAvenantAdherantState} from './state';
import {HistoriqueAvenantAdherant} from './model';

const initialState: HistoriqueAvenantAdherantState = {
    historiqueAvenantAdherentList: [],
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setHistoriqueAvenantAdherent, (state, payload: any) => ({
    ...state, historiqueAvenantAdherentList: payload.historiqueAvenantAdherentList
  }))
);

export function reducer(state: HistoriqueAvenantAdherantState | undefined, action: Action) {
  return featureReducer(state, action);
}
