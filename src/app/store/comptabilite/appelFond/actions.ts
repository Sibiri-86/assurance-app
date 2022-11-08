import {props, createAction} from '@ngrx/store';
import { Report } from '../../contrat/police/model';
import { AppelFond, AppelFondList } from './model';
export const loadAppelFond = createAction('[App Init] load AppelFond');
export const setAppelFond = createAction('[App Init] set AppelFond',  props<AppelFondList>());
export const createAppelFond = createAction('[App Init] Create AppelFond', props<AppelFond>());
export const updateAppelFond = createAction('[App Init] update AppelFond', props<AppelFond>());
export const FetchReportAppelFond = createAction('[Report] Fetch Report appel de Fond', props<Report>());
export const setReportAppelFond = createAction('[set Report] set Report appel de Fond', props<{reportFile: ArrayBuffer}>());
export const deleteAppelFond = createAction('[App Init] delete Appel Fond', props<AppelFond>());


