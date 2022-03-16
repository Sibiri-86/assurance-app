import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { BonPriseEnChargeList } from './model';
import {BonPriseEnChargeState} from './state';

const initialState: BonPriseEnChargeState = {
  bonPriseEnChargeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setBon, (state, payload: BonPriseEnChargeList) => ({
    ...state, bonPriseEnChargeList: payload.bonPriseEnChargeList
  }))
);

export function reducer(state: BonPriseEnChargeState | undefined, action: Action) {
  return featureReducer(state, action);
}
