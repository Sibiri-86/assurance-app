import {Exercice, Police, Rapport, ReportFile} from "./model";
import { Statistique } from "./model";
export interface PoliceState {
    policeList: Array<Police>;
    statistique: Statistique;
    rapport: Rapport;
    reportFile: ArrayBuffer;
    exerciceActive: Exercice;
}
