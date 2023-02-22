import {props, createAction} from '@ngrx/store';
import { ProduitPharmaceutiqueExclu, ProduitPharmaceutiqueExcluList } from './model';
export const createProduitPharmaceutiqueExclu = createAction('[App Init] Create ProduitPharmaceutiqueExclu', props<ProduitPharmaceutiqueExclu>());
export const updateProduitPharmaceutiqueExclu = createAction('[App Init] update ProduitPharmaceutiqueExclu', props<ProduitPharmaceutiqueExclu>());
export const deleteProduitPharmaceutiqueExclu = createAction('[App Init] delete ProduitPharmaceutiqueExclu', props<ProduitPharmaceutiqueExclu>());
export const loadProduitPharmaceutiqueExclu = createAction('[App Init] load ProduitPharmaceutiqueExclu');
export const setProduitPharmaceutiqueExclu = createAction('[App Init] set ProduitPharmaceutiqueExclu',  props<ProduitPharmaceutiqueExcluList>());
export const importProduitPharmaceutiqueExclu = createAction('[App Init] import ProduitPharmaceutiqueExclu',  props<{file: File}>());