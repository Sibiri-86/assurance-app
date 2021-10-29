import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { SecteurActivite, SecteurActiviteList } from './model';
import {SecteurActiviteState} from './state';

const initialState : SecteurActiviteState = {
  secteurActiviteList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setSecteurActivite, (state, payload: SecteurActiviteList) => ({
    ...state, secteurActiviteList: payload.secteurActiviteDtoList
  }))
);

export function reducer(state: SecteurActiviteState | undefined, action: Action) {
  return featureReducer(state, action);
}