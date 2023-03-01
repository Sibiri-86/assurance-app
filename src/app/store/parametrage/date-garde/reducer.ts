import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { DateGardeList } from './model';
import { DateGardeState } from './state';

const initialState : DateGardeState = {
  dateGardeList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setDateGarde, (state, payload: DateGardeList) => ({
    ...state, dateGardeList: payload.dateGardeDtoList
  }))
);

export function reducer(state: DateGardeState | undefined, action: Action) {
  return featureReducer(state, action);
}