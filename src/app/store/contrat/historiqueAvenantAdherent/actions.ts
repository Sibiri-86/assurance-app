import {props, createAction} from '@ngrx/store';
import {HistoriqueAvenant, HistoriqueAvenantAdherentList, HistoriqueAvenantList} from './model';
import {Avenant, TypeHistoriqueAvenant} from '../historiqueAvenant/model';
export const loadHistoriqueAvenantAdherent = createAction('[App Init] load AvenantAdherent', props<{haId: string}>());
export const setHistoriqueAvenantAdherent = createAction('[App Init] set AvenantAdherent',  props<HistoriqueAvenantAdherentList>());
export const loadHistoriqueAvenantAdherentByHistoriqueIdAndTypeHistorique = createAction('[App Init] load ' +
    'AvenantAdherentByHistoriqueIdAndTypeHistorique', props<{typeHistoriqueAvenant: TypeHistoriqueAvenant, haId: string}>());
export const LoadHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse = createAction('[App Init] load ' +
    'HistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse', props<{haId: string}>());
export const loadHistoriqueAvenantAdherentByHistoriqueId = createAction('[App Init] load ' +
    'AvenantAdherentByHistoriqueIdAndTypeHistorique', props<{haId: string}>());


