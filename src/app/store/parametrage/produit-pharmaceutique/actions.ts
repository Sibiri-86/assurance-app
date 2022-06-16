import {props, createAction} from '@ngrx/store';
import { ProduitPharmaceutique, ProduitPharmaceutiqueList } from './model';
export const createProduitPharmaceutique = createAction('[App Init] Create ProduitPharmaceutique', props<ProduitPharmaceutique>());
export const updateProduitPharmaceutique = createAction('[App Init] update ProduitPharmaceutique', props<ProduitPharmaceutique>());
export const deleteProduitPharmaceutique = createAction('[App Init] delete ProduitPharmaceutique', props<ProduitPharmaceutique>());
export const loadProduitPharmaceutique = createAction('[App Init] load ProduitPharmaceutique');
export const setProduitPharmaceutique = createAction('[App Init] set ProduitPharmaceutique',  props<ProduitPharmaceutiqueList>());
export const importProduitPharmaceutique = createAction('[App Init] import ProduitPharmaceutique',  props<{file: File}>());