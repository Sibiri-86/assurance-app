import { Police, ReportFile } from "./model";
import { Statistique } from "./model";
export interface PoliceState {
    policeList: Array<Police>
    statistique: Statistique
    reportFile: ArrayBuffer
}
