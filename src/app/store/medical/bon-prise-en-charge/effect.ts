import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { BonPriseEnChargeService } from './service';
import * as featureActions from './actions';
import {BonPriseEnCharge} from './model';
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
        mergeMap((bon: BonPriseEnCharge) =>
            this.bonPriseEnChargeService.posBons(bon).pipe(
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
}
