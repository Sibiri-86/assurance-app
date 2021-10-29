import {props, createAction} from '@ngrx/store';
import { Genre, GenreList } from './model';
export const createGenre = createAction('[App Init] Create Genre', props<Genre>());
export const updateGenre = createAction('[App Init] update Genre', props<Genre>());
export const deleteGenre = createAction('[App Init] delete Genre', props<Genre>());
export const loadGenre = createAction('[App Init] load Genre');
export const setGenre = createAction('[App Init] set Genre',  props<GenreList>());
export const importGenre = createAction('[App Init] import Genre',  props<{file: File}>());