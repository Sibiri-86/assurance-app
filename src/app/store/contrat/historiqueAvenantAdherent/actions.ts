import {props, createAction} from '@ngrx/store';
import {HistoriqueAvenant, HistoriqueAvenantAdherentList, HistoriqueAvenantList} from './model';
export const loadHistoriqueAvenantAdherent = createAction('[App Init] load AvenantAdherent', props<{haId: string}>());
export const setHistoriqueAvenantAdherent = createAction('[App Init] set AvenantAdherent',  props<HistoriqueAvenantAdherentList>());
