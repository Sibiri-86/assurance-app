import { createAction, props } from '@ngrx/store';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { ProduitPharmaceutiqueExcluEntite, ProduitPharmaceutiqueExcluEntiteList } from '../../parametrage/produit-pharmaceutique-exclu/model';


/* export const setRecapitulatif = createAction('[App Init] set Recapitulatif',  props<RecapitulatifList>());
export const loadRecapitulatif = createAction('[App Init] load Recapitulatif'); */
export const FetchReportRecapitulatif = createAction('[Report] Fetch Report Recapitulatif', props<Report>());
export const setReportRecapitulatif = createAction('[set Report] set Report Recapitulatif', props<{reportFile: ArrayBuffer}>());
export const createProduitPharmaceutiqueExclu = createAction('[App Init] Produit Pharmaceutique Exclu', props<ProduitPharmaceutiqueExcluEntite>());
export const loadProduitPharmaceutiqueExclu = createAction('[App Init] load Produit Pharmaceutique Exclu');
export const setProduitPharmaceutiqueExclu = createAction('[App Init] set Produit Pharmaceutique Exclu',  props<ProduitPharmaceutiqueExcluEntiteList>());
