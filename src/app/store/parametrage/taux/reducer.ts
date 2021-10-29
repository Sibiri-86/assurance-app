import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TauxList } from './model';
import {TauxState} from './state';

const initialState : TauxState = {
  tauxList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTaux, (state, payload: TauxList) => ({
    ...state, tauxList: payload.typeTauxDtoList
  }))
);

export function reducer(state: TauxState | undefined, action: Action) {
  return featureReducer(state, action);
}