import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { SecteurList } from './model';
import {SecteurState} from './state';

const initialState : SecteurState = {
  secteurList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setSecteur, (state, payload: SecteurList) => ({
    ...state, secteurList: payload.secteurDtoList
  }))
);

export function reducer(state: SecteurState | undefined, action: Action) {
  return featureReducer(state, action);
}