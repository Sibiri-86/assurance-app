import { stat } from 'fs';
import {AppState} from '../../app.state';
export const policeList = (state: AppState) => state.policeState.policeList;
export const statistique = (state: AppState) => state.policeState.statistique;
export const selectByteFile = (state: AppState) => state.policeState.reportFile;