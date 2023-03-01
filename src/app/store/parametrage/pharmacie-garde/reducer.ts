import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PharmacieGardeList } from './model';
import { PharmacieGardeState } from './state';

const initialState : PharmacieGardeState = {
  pharmacieGardeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPharmacieGarde, (state, payload: PharmacieGardeList) => ({
    ...state, pharmacieGardeList: payload.pharmacieGardeDtoList
  }))
);

export function reducer(state: PharmacieGardeState | undefined, action: Action) {
  return featureReducer(state, action);
}