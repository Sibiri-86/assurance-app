import { AppState } from "src/app/store/app.state";
export const selectByteFile = (state: AppState) => state.statistiqueTrancheAgeState.reportFile;

