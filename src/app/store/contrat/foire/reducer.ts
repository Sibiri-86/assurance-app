import {Action, createReducer, on} from '@ngrx/store';
import { FoireState } from './state';
import * as featureActions from './actions';

const initialState: FoireState = {
  foireList: [],
 
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setFoire, (state, payload) => ({
	...state, foireList: payload.foireDtoList
  })),
  
);

export function reducer(state: FoireState | undefined, action: Action) {
	return featureReducer(state, action);
}
