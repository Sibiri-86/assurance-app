import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { GroupeList } from './model';
import {GroupeState} from './state';

const initialState : GroupeState = {
  groupeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setGroupe, (state, payload: GroupeList) => ({
    ...state, groupeList: payload.groupeDtoList
  }))
);

export function reducer(state: GroupeState | undefined, action: Action) {
  return featureReducer(state, action);
}