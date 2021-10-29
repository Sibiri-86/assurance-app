import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TypeAffaireList } from './model';
import {TypeAffaireState} from './state';

const initialState : TypeAffaireState = {
  typeAffaireList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTypeAffaire, (state, payload: TypeAffaireList) => ({
    ...state, typeAffaireList: payload.typeAffaireDtoList
  }))
);

export function reducer(state: TypeAffaireState | undefined, action: Action) {
  return featureReducer(state, action);
}