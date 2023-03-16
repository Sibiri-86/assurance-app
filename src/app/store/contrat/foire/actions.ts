import {createAction, props} from '@ngrx/store';
import { Foire, FoireList } from './model';

export const loadFoireList = createAction('[App Init] load Foire');
export const setFoire = createAction('[App Init] set foire', props<FoireList>());
export const createFoire = createAction('[App Init] Create Foire', props<Foire>());
export const updateFoire = createAction('[App Init] update Foire', props<Foire>());
export const deleteFoire = createAction('[App Init] delete Foire', props<Foire>());
