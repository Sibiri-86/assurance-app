import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { AdherentList } from './model';
import {AdherentState} from './state';

const initialState : AdherentState = {
  adherentList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setAdherent, (state, payload: AdherentList) => ({
    ...state, adherentList: payload.adherentDtoList
  }))
);

export function reducer(state: AdherentState | undefined, action: Action) {
  return featureReducer(state, action);
}