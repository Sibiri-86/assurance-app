import {Action, createReducer, on} from '@ngrx/store';
import { AssuranceVoyageState } from './state';
import * as featureActions from './actions';

const initialState: AssuranceVoyageState = {
  assuranceVoyageList: [],
 
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setAssuranceVoyage, (state, payload) => ({
	...state, assuranceVoyageList: payload.assuranceVoyageDtoList
  })),
  
);

export function reducer(state: AssuranceVoyageState | undefined, action: Action) {
	return featureReducer(state, action);
}
