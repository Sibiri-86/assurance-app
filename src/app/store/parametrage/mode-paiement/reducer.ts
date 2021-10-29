import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ModePaiementList } from './model';
import {ModePaiementState} from './state';

const initialState : ModePaiementState = {
  modePaiementList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setModePaiement, (state, payload: ModePaiementList) => ({
    ...state, modePaiementList: payload.typeModePaiementDtoList
  }))
);

export function reducer(state: ModePaiementState | undefined, action: Action) {
  return featureReducer(state, action);
}