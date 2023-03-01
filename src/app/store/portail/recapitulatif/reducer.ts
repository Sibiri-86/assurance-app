import * as featureActions from './action';
import { Action, createReducer, on } from '@ngrx/store';
import { PortailState} from './state';
import { ProduitPharmaceutiqueExcluEntiteList } from '../../parametrage/produit-pharmaceutique-exclu/model';
import { ReportFile } from '../../contrat/bulletin-adhesion/model';

const initialState: PortailState = {
    reportFile: null,
    produitPharmaceutiqueExcluEntiteList: null
    
  };

const featureReducer = createReducer(
    initialState,
   
     on(featureActions.setProduitPharmaceutiqueExclu, (state, payload: ProduitPharmaceutiqueExcluEntiteList) => ({
        ...state, produitPharmaceutiqueExcluEntiteList: payload.pharmaceutiqueExcluEntiteDtos
      })),
    on(featureActions.setReportRecapitulatif, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
    })),
   
  );
export function reducer(state: PortailState | undefined, action: Action) {
    return featureReducer(state, action);
  }
