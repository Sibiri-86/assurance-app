import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { PaysList } from './model';
import {PaysState} from './state';

const initialState : PaysState = {
  paysList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setPays, (state, payload: PaysList) => ({
    ...state, paysList: payload.paysDtoList
  }))
);

export function reducer(state: PaysState | undefined, action: Action) {
  return featureReducer(state, action);
}