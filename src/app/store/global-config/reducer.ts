import { createReducer, on, Action } from '@ngrx/store';
import {SetStatus} from './actions';
import { Status, StatusEnum} from './model';
import {GlobalState} from './state';

const initialState : GlobalState = {
  status: null
};

const featureReducer = createReducer(
  initialState,
  on(SetStatus, (state, payload: Status) => ({
    ...state, status: payload
  }))
);

export function reducer(state: GlobalState | undefined, action: Action) {
  return featureReducer(state, action);
}