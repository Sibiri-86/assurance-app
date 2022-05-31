import {Exercice} from './model';

export interface ExerciceState {
  exerciceList: Array<Exercice>;
  exerciceActive: Exercice;
  lastExercice: Exercice;
}
