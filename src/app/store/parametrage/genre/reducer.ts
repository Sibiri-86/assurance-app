import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { GenreList } from './model';
import {GenreState} from './state';

const initialState : GenreState = {
  genreList: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setGenre, (state, payload: GenreList) => ({
    ...state, genreList: payload.genreDtoList
  }))
);

export function reducer(state: GenreState | undefined, action: Action) {
  return featureReducer(state, action);
}