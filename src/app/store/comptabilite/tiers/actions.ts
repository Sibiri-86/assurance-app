import {props, createAction} from '@ngrx/store';
import { Tiers, TiersList } from './model';
export const loadTiers = createAction('[App Init] load Tiers');
export const setTiers = createAction('[App Init] set Tiers',  props<TiersList>());
export const createTiers = createAction('[App Init] Create Tiers', props<Tiers>());
export const updateTiers = createAction('[App Init] update Tiers', props<Tiers>());
/* export const FetchReportAppelFond = createAction('[Report] Fetch Report appelFond', props<Report>());
export const setReportAppelFond = createAction('[set Report] set Report appelFond', props<{reportFile: ArrayBuffer}>()); */


