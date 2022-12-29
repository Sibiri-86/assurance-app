import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';
import { AlerteService } from './service';
import { Alerte } from './model';

@Injectable()
export class AlerteEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private alerteService: AlerteService
    ) {
    }

    createAlerte$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createAlerte),
        mergeMap((Alerte: Alerte) =>
            this.alerteService.posBanque(Alerte).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadAlerte()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        updateAlerte$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateAlerte),
            mergeMap((Alerte: Alerte) =>
                this.alerteService.updateBanque(Alerte).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadAlerte()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteAlerte$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteAlerte),
                mergeMap((Alerte: Alerte) =>
                    this.alerteService.deleteBanque(Alerte).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadAlerte()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    loadAlerte$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAlerte),
        mergeMap(() =>
            this.alerteService.$getBanques().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setAlerte(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    importAlerte$ = createEffect(() =>
    this.actions$.pipe(
    ofType(featureActions.importAlerte),
    mergeMap(({file}) =>
        this.alerteService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadAlerte()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
));

}