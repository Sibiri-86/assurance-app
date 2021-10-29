import {props, createAction} from '@ngrx/store';
import { TypePrime, TypePrimeList } from './model';
export const createTypePrime = createAction('[App Init] Create TypePrime', props<TypePrime>());
export const updateTypePrime = createAction('[App Init] update TypePrime', props<TypePrime>());
export const deleteTypePrime = createAction('[App Init] delete TypePrime', props<TypePrime>());
export const loadTypePrime = createAction('[App Init] load TypePrime');
export const setTypePrime = createAction('[App Init] set TypePrime',  props<TypePrimeList>());
export const importTypePrime = createAction('[App Init] import TypePrime',  props<{file: File}>());