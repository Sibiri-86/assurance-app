import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ProduitPharmaceutiqueList } from './model';
import {ProduitPharmaceutiqueState} from './state';

const initialState : ProduitPharmaceutiqueState = {
  produitPharmaceutiqueList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setProduitPharmaceutique, (state, payload: ProduitPharmaceutiqueList) => ({
    ...state, produitPharmaceutiqueList: payload.produitPharmaceutiqueDtoList
  }))
);

export function reducer(state: ProduitPharmaceutiqueState | undefined, action: Action) {
  return featureReducer(state, action);
}