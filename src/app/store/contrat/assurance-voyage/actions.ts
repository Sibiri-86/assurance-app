import { createAction, props } from "@ngrx/store";
import { AssuranceVoyage, AssuranceVoyageList } from "./model";

export const loadAssuranceVoyageList = createAction('[App Init] load assuranceVoyage');
export const setAssuranceVoyage = createAction('[App Init] set assuranceVoyage', props<AssuranceVoyageList>());
export const createAssuranceVoyage = createAction('[App Init] Create assuranceVoyage', props<AssuranceVoyage>());
export const updateAssuranceVoyage = createAction('[App Init] update assuranceVoyage', props<AssuranceVoyage>());
export const deleteAssuranceVoyage = createAction('[App Init] delete assuranceVoyage', props<AssuranceVoyage>());