import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { QuartierList } from './model';
import { QuartierState } from './state';


const initialState : QuartierState = {
  quartierDtoList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setQuartier, (state, payload: QuartierList) => ({
    ...state, quartierDtoList: payload.quartierDtoList
  }))
);

export function reducer(state: QuartierState | undefined, action: Action) {
  return featureReducer(state, action);
}