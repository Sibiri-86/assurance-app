import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { DimensionPeriodeService } from './service';
import * as featureActions from './actions';
import {DimensionPeriode} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class DimensionPeriodeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private DimensionPeriodeService: DimensionPeriodeService
    ) {
    }

    createDimensionPeriode$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createDimensionPeriode),
        mergeMap((DimensionPeriode: DimensionPeriode) =>
            this.DimensionPeriodeService.posDimensionPeriode(DimensionPeriode).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadDimensionPeriode()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateDimensionPeriode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateDimensionPeriode),
            mergeMap((DimensionPeriode: DimensionPeriode) =>
                this.DimensionPeriodeService.updateDimensionPeriode(DimensionPeriode).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadDimensionPeriode()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteDimensionPeriode$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteDimensionPeriode),
                mergeMap((DimensionPeriode: DimensionPeriode) =>
                    this.DimensionPeriodeService.deleteDimensionPeriode(DimensionPeriode).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadDimensionPeriode()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchDimensionPeriode$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadDimensionPeriode),
        mergeMap(() =>
            this.DimensionPeriodeService.$getDimensionPeriodes().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setDimensionPeriode(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importDimensionPeriode),
    mergeMap(({file}) =>
        this.DimensionPeriodeService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadDimensionPeriode()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);
}