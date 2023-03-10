import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { QuartierPrestataireGarantList } from './model';
import { QuartierPrestataireGarantState } from './state';


const initialState : QuartierPrestataireGarantState = {
  quartierPrestataireGarantDtoList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setQuartierPrestataire, (state, payload: QuartierPrestataireGarantList) => ({
    ...state, quartierPrestataireGarantDtoList: payload.quartierPrestataireGarantDtoList
  }))
);

export function reducer(state: QuartierPrestataireGarantState | undefined, action: Action) {
  return featureReducer(state, action);
}