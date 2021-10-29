import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { GarantService } from './service';
import * as featureActions from './actions';
import {Garant} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class GarantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private GarantService: GarantService
    ) {
    }

    createGarant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createGarant),
        mergeMap((Garant: Garant) =>
            this.GarantService.posGarant(Garant).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadGarant()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateGarant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateGarant),
            mergeMap((Garant: Garant) =>
                this.GarantService.updateGarant(Garant).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadGarant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteGarant$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteGarant),
                mergeMap((Garant: Garant) =>
                    this.GarantService.deleteGarant(Garant).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadGarant()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));  
                
                deleteGarants$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.deleteGarants),
                    mergeMap(({garantList}) =>
                        this.GarantService.deleteGarants(garantList).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadGarant()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

    fetchGarant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadGarant),
        mergeMap(() =>
            this.GarantService.$getGarants().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setGarant(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importGarant),
    mergeMap(({file}) =>
        this.GarantService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadGarant()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}