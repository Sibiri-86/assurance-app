import { AppState } from "src/app/store/app.state";
export const selectByteFile = (state: AppState) => state.recapitulatifState.reportFile;
export const produitPharmaceutiqueExcluEntiteList = (state: AppState) => state.portailState.produitPharmaceutiqueExcluEntiteList;
