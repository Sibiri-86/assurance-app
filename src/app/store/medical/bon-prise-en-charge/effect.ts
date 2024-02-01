import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { BonPriseEnChargeService } from './service';
import * as featureActions from './actions';
import {BonPriseEnCharge, Report} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BonPriseEnChargeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private bonPriseEnChargeService: BonPriseEnChargeService
    ) {
    }

    createBons$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createBon),
        mergeMap(({bon, dateD, dateF}) =>
            this.bonPriseEnChargeService.posBons(bon).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadBonPriseEnChargePeriode({dateD, dateF})
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    valideBons$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.valideBon),
        mergeMap((bon: BonPriseEnCharge) =>
            this.bonPriseEnChargeService.posvalideBons(bon).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadBon()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    invalideBons$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.invalideBon),
            mergeMap((bon: BonPriseEnCharge) =>
                this.bonPriseEnChargeService.posInvalideBons(bon).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadBon()
                    ]),
                    catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

     updateBon$ = createEffect(() =>
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

    fetchBons$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadBons),
        mergeMap(() =>
            this.bonPriseEnChargeService.$getBonsSansPrestation().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setBon(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchBonsByAdherent$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadBonsByAdherent),
        mergeMap(({adherentId}) =>
            this.bonPriseEnChargeService.$getBonsSansPrestationByAdherent(adherentId).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setBon(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    loadBonPeriode$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadBonPriseEnChargePeriode),
        mergeMap(({dateD, dateF}) =>
            this.bonPriseEnChargeService.$getBonsByPeriode(dateD,dateF).pipe(
                switchMap(value => [
                    // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setBon(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));
}
