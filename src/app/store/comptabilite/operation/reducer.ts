import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { OperationList } from './model';
import { OperationState } from './state';




const initialState : OperationState = {
  operationList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setOperation, (state, payload: OperationList) => ({
    ...state, operationList: payload.operationList
  }))
);

export function reducer(state: OperationState | undefined, action: Action) {
  return featureReducer(state, action);
}