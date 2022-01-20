import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';

import { Adherent, AdherentList } from './model';
import {AdherentState} from './state';

const initialState : AdherentState = {
  adherentList: null,
  selectedAdherentResearch: null,
  listeActualisee: null
};

// @ts-ignore
const featureReducer = createReducer(
  initialState,
  on(featureActions.setAdherent, (state, payload: AdherentList) => ({
    ...state, adherentList: payload.adherentDtoList
  })),
  on(featureActions.selectedAdherentForSearch, (state, payload: Adherent) => ({
    ...state, selectedAdherentResearch: payload
  })),
  on(featureActions.setListeActualisee, (state, payload) => ({
    ...state, listeActualisee: payload.listeActualisee
  }))
);

export function reducer(state: AdherentState | undefined, action: Action) {
  return featureReducer(state, action);
}