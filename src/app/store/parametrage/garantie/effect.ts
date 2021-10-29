import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { GarantieService } from './service';
import * as featureActions from './actions';
import {Garantie, GarantieList} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class GarantieEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private garantieService: GarantieService
    ) {
    }

    createGarantie$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createGarantie),
        mergeMap((garantie: Garantie) =>
            this.garantieService.posGarantie(garantie).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadGarantie()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateGarantie$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateGarantie),
            mergeMap((garantie: Garantie) =>
                this.garantieService.updateGarantie(garantie).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadGarantie()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteGarantie$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteGarantie),
                mergeMap((garantie: Garantie) =>
                    this.garantieService.deleteGarantie(garantie).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadGarantie()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchGarantie$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadGarantie),
        mergeMap(() =>
            this.garantieService.$getGaranties().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setGarantie(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

importGarantie$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importGarantie),
    mergeMap(({file}) =>
        this.garantieService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadGarantie()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);
}