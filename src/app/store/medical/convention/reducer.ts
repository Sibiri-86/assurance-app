import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { ConventionList } from './model';
import { ConventionState } from './state';

const initialState: ConventionState = {
  conventionList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setConvention, (state, payload: ConventionList) => ({
    ...state, conventionList: payload.conventionList
  }))
);

export function reducer(state: ConventionState | undefined, action: Action) {
  return featureReducer(state, action);
}
