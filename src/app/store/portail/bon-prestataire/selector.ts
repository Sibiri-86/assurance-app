import {AppState} from '../../app.state';
export const bonPrestataireList = (state: AppState) => state.bonPrestataireState.bonPrestataireDtoList;
export const selectByteFile = (state: AppState) => state.bonPrestataireState.reportFile;
