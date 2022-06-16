import { createReducer, on, Action } from '@ngrx/store';
import { Rapport } from '../police/model';
import * as featureActions from './actions';
import { GroupeList } from './model';
import {GroupeState} from './state';

const initialState : GroupeState = {
  groupeList: null,
  rapport: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setGroupe, (state, payload: GroupeList) => ({
    ...state, groupeList: payload.groupeDtoList
  })),
  on(featureActions.setRapport, (state, payload: Rapport) => ({
    ...state, rapport: payload
  }))
);

export function reducer(state: GroupeState | undefined, action: Action) {
  return featureReducer(state, action);
}