import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { AlerteList } from './model';
import { AlerteState } from './state';


const initialState : AlerteState = {
  alerteList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setAlerte, (state, payload: AlerteList) => ({
    ...state, alerteList: payload.alerteDtoList
  }))
);

export function reducer(state: AlerteState | undefined, action: Action) {
  return featureReducer(state, action);
}