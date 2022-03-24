import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique, Report} from './model';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdonnanceMedicaleService } from './service';

@Injectable()
export class OrdonnanceMedicaleEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ordonnanceMedicaleService: OrdonnanceMedicaleService
    ) {
    }

    createOrdonnance$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createOrdonnance),
        mergeMap((ordonnace: OrdonnanceMedical) =>
            this.ordonnanceMedicaleService.postOrdonnanceMedicale(ordonnace).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadOrdonnance()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        fetchBon$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadOrdonnance),
        mergeMap(() =>
            this.ordonnanceMedicaleService.$getOrdonnanceMedicale().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setOrdonnance(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchReportOrdonnance$ = createEffect(() =>
                            this.actions$.pipe(
                                ofType(featureActions.FetchReportOrdonnance),
                                mergeMap((report: Report) =>
                                    this.ordonnanceMedicaleService.$getReportOrdonnance(report).pipe(
                                        switchMap(value => [
                                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                            featureActions.setReportOrdonnance({reportFile: value})
                                        ]),
                                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    ))
                                ));

    /*  updateBon$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateBon),
            mergeMap((bon: BonPriseEnCharge) =>
                this.bonPriseEnChargeService.updateBons(bon).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadBon()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteActe$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteBon),
                mergeMap((bon: BonPriseEnCharge) =>
                    this.bonPriseEnChargeService.deleteBons(bon).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadBon()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

    fetchReportBon$ = createEffect(() =>
                            this.actions$.pipe(
                                ofType(featureActions.FetchReportBon),
                                mergeMap((report: Report) =>
                                    this.bonPriseEnChargeService.$getReport(report).pipe(
                                        switchMap(value => [
                                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                            featureActions.setReportBon({reportFile: value})
                                        ]),
                                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    ))
                                ));

    fetchBon$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadBon),
        mergeMap(() =>
            this.bonPriseEnChargeService.$getBons().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setBon(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
 */}
