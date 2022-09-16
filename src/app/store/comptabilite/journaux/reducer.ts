import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { JournauxList } from './model';
import { JournauxState } from './state';

const initialState : JournauxState = {
  journauxList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setJournaux, (state, payload: JournauxList) => ({
    ...state, journauxList: payload.journauxList
  }))
);

export function reducer(state: JournauxState | undefined, action: Action) {
  return featureReducer(state, action);
}