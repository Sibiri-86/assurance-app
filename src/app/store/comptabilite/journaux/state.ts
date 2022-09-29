import { Journaux } from "./model";

export interface JournauxState {
    journauxList: Array<Journaux>;
    reportFile: ArrayBuffer;
}