import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ProduitPharmaceutiqueExcluList } from './model';
import {ProduitPharmaceutiqueExcluState} from './state';

const initialState : ProduitPharmaceutiqueExcluState = {
  produitPharmaceutiqueExcluList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setProduitPharmaceutiqueExclu, (state, payload: ProduitPharmaceutiqueExcluList) => ({
    ...state, produitPharmaceutiqueExcluList: payload.produitPharmaceutiqueExcluDtoList
  }))
);

export function reducer(state: ProduitPharmaceutiqueExcluState | undefined, action: Action) {
  return featureReducer(state, action);
}