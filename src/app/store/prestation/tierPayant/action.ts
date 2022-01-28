import { createAction, props } from '@ngrx/store';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { Report } from '../../contrat/police/model';
import {SinistreTierPayant, SinistreTierPayantList} from './model';
// import { OrdreReglement, OrdreReglementList, Prefinancement, PrefinancementList } from './model';
export const createTierPayant = createAction('[App Init] Create TierPayant', props<{tierPayant: Array<SinistreTierPayant>}>());
export const setTierPayant = createAction('[App Init] set TierPayant',  props<SinistreTierPayantList>());
export const loadTierPayant = createAction('[App Init] load tierPayant');
export const FetchReportTierPayant = createAction('[Report] Fetch Report tierPayant', props<Report>());
export const setReportTierPayant = createAction('[set Report] set Report tierPayant', props<{reportFile: ArrayBuffer}>());

