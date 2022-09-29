import {AppState} from '../../app.state';
export const journauxList = (state: AppState) => state.journauxState.journauxList;
export const selectByteFile = (state: AppState) => state.journauxState.reportFile;