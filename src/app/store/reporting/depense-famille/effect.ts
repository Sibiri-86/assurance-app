import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { DepenseFamilleService} from './service';
import * as featureActions from './action';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { Bilan, Check } from './model';
import { Report } from '../../contrat/police/model';
import { ExerciceComptable } from '../../comptabilite/exercice-comptable/model';

@Injectable()
export class DepenseFamilleEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private depenseFamilleService: DepenseFamilleService
    ) {
    }

   



    findDepenseFamille$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateDepenseFamille),
            mergeMap((check: Check) =>
                this.depenseFamilleService.findDepenseFamille(check).pipe(
                    switchMap(value => [
                       // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setDepenseFamille(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        findDepenseFamilleActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateDepenseFamilleActe),
            mergeMap((check: Check) =>
                this.depenseFamilleService.findDepenseFamilleActe(check).pipe(
                    switchMap(value => [
                        featureActions.setDepenseFamille(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        FetchReportDepenseFamilleActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportDepenseFamille),
            mergeMap((report: Report) =>
                this.depenseFamilleService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportDepenseFamille({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        FetchReportBilan$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportBilan),
            mergeMap((report: ExerciceComptable) =>
                this.depenseFamilleService.$getReportBilan(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportDepenseFamille({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        FetchReportDepenseFamilleExcel$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.FetchReportDepenseFamilleExcel),
                mergeMap((report: Check) =>
                    this.depenseFamilleService.$getReportDepenseFamilleExcel(report).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setReportDepenseFamille({reportFile: value})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
            ));
}
