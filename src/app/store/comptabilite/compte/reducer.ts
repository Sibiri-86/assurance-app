import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';

import { CompteList } from './model';
import { CompteState } from './state';

const initialState : CompteState = {
  compteList: null,
};

// @ts-ignore
const featureReducer = createReducer(
  initialState,
  on(featureActions.setCompte, (state, payload: CompteList) => ({
    ...state, compteList: payload.compteDtoList
  }))
);

export function reducer(state: CompteState | undefined, action: Action) {
  return featureReducer(state, action);
}