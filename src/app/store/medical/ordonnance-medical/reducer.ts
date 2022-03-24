import { createReducer, on, Action } from '@ngrx/store';
import * as featureActions from './actions';
import { OrdonnanceMedicalProduitPharmaceutiqueList, ReportFile } from './model';
import { OrdonnanceMedicaleState } from './state';

const initialState: OrdonnanceMedicaleState = {
  ordonnanceMedicalProduitPharmaceutiqueList: null,
  reportFile: null
};

const featureReducer = createReducer(
  initialState,
  on(featureActions.setOrdonnance, (state, payload: OrdonnanceMedicalProduitPharmaceutiqueList) => ({
    ...state, ordonnanceMedicalProduitPharmaceutiqueList: payload.ordonnaceMedicalProduitPharmaceutiqueDTOList
  })),
  on(featureActions.setReportOrdonnance, (state, payload: ReportFile) => ({
    ...state, reportFile: payload.reportFile
  })),
);

 export function reducer(state: OrdonnanceMedicaleState | undefined, action: Action) {
  return featureReducer(state, action);
}
