import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TauxCommissionIntermediaireList } from './model';
import {TauxCommissionIntermediaireState} from './state';

const initialState : TauxCommissionIntermediaireState = {
  tauxcommissionintermediaireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTauxCommissionIntermediaire, (state, payload: TauxCommissionIntermediaireList) => ({
    ...state, tauxcommissionintermediaireList: payload.tauxCommissionIntermediaireDtoList
  }))
);

export function reducer(state: TauxCommissionIntermediaireState | undefined, action: Action) {
  return featureReducer(state, action);
}