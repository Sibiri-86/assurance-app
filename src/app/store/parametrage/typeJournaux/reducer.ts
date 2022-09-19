import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { TypeJournauxList } from './model';
import {TypeJournauxState} from './state';

const initialState : TypeJournauxState = {
  typeJournauxList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setTypeJournaux, (state, payload: TypeJournauxList) => ({
    ...state, typeJournauxList: payload.typeJournauxList
  }))
);

export function reducer(state: TypeJournauxState | undefined, action: Action) {
  return featureReducer(state, action);
}