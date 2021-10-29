import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { MedecinList } from './model';
import {MedecinState} from './state';

const initialState : MedecinState = {
  medecinList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setMedecin, (state, payload: MedecinList) => ({
    ...state, medecinList: payload.medecinDtoList
  }))
);

export function reducer(state: MedecinState | undefined, action: Action) {
  return featureReducer(state, action);
}