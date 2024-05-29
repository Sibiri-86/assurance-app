import { PrefinancementState } from "./state";
import * as featureActions from "./action";
import { Action, createReducer, on } from "@ngrx/store";
import { MontantPlafondGarantieResponse} from "./model";
import { CheckPlafondResponse, CheckPrefinancementReponse, OrdreReglementList, OrdreReglementListDirection, OrdreReglementListFinance, OrdreReglementListMedical, PrefinancementList } from "./model";
import { ReportFile } from "../../contrat/police/model";

const initialState: PrefinancementState = {
    prefinancementList: null,
    ordreReglementList: null,
    reportFile: null,
    checkPrefinancementReponse: null,
    montantPlafondSousActe: null,
    isTwist: null,
    selectedMontantResearch: null,
    ordreReglementListMedical: null,
    ordreReglementListFinance: null,
    ordreReglementListDirection: null
  };

const featureReducer = createReducer(
    initialState,
    on(featureActions.setPrefinancement, (state, payload: PrefinancementList) => ({
      ...state, prefinancementList: payload.prefinancementDtoList
    })),
    on(featureActions.setLoadOrdreReglement, (state, payload: OrdreReglementList) => ({
        ...state, ordreReglementList: payload.ordreReglementDtoList
      })),
    on(featureActions.setReportPrestation, (state, payload: ReportFile) => ({
        ...state, reportFile: payload.reportFile
      })),
    on(featureActions.setCheckPrefinancement, (state, payload: CheckPrefinancementReponse) => ({
        ...state, checkPrefinancementReponse: payload.list
      })),
    on(featureActions.setPlafondSousActe, (state, payload: CheckPlafondResponse) => ({
        ...state, montantPlafondSousActe: payload.montant
      })),
      on(featureActions.selectedMontantForSearch, (state, payload: MontantPlafondGarantieResponse) => ({
          ...state, check: payload.checkMontantRestantPlafondGarantie
        })),
      on(featureActions.setLoadOrdreReglementMedical, (state, payload: OrdreReglementListMedical) => ({
        ...state, ordreReglementListMedical: payload.ordreReglementDtoList
      })),
      on(featureActions.setLoadOrdreReglementFinance, (state, payload: OrdreReglementListFinance) => ({
        ...state, ordreReglementListFinance: payload.ordreReglementDtoList
      })),
      on(featureActions.setLoadOrdreReglementDirection, (state, payload: OrdreReglementListDirection) => ({
        ...state, ordreReglementListDirection: payload.ordreReglementDtoList
      })),
      on(featureActions.setPlafondSousActe, (state, payload: CheckPlafondResponse) => ({
        ...state, isTwist: payload.isTwist
      })),
  );

export function reducer(state: PrefinancementState | undefined, action: Action) {
    return featureReducer(state, action);
  }
