import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { StatusList } from './model';
import {StatusState} from './state';

const initialState : StatusState = {
  statusList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setStatus, (state, payload: StatusList) => ({
    ...state, statusList: payload.typeStatusDtoList
  }))
);

export function reducer(state: StatusState | undefined, action: Action) {
  return featureReducer(state, action);
}