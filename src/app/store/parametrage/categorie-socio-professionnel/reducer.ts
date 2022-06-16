import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { CategorieSocioProfessionnelList } from './model';
import {CategorieSocioProfessionnelState} from './state';

const initialState : CategorieSocioProfessionnelState = {
  categorieSocioProfessionnelList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setCategorieSocioProfessionnel, (state, payload: CategorieSocioProfessionnelList) => ({
    ...state, categorieSocioProfessionnelList: payload.typeCategorieSocioProfessionnelDtoList
  }))
);

export function reducer(state: CategorieSocioProfessionnelState | undefined, action: Action) {
  return featureReducer(state, action);
}