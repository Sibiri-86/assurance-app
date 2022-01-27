import {createAction, props} from '@ngrx/store';
import {Exercice} from './model';

export const loadExerciceList = createAction('[App Init] load exercice liste by police', props<{policeId: string}>());
export const setExerciceList = createAction('[App Init] set exercice liste by police', props<{exerciceList: Array<Exercice>}>());
export const loadExerciceActif = createAction('[App Init] load exercice actif by police', props<{policeId: string}>());
export const setExerciceActif = createAction('[App Init] set exercice actif by police', props<{exerciceActif: Exercice}>());
