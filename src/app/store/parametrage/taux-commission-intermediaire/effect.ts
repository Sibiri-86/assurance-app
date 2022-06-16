import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TauxCommissionIntermediaireService } from './service';
import * as featureActions from './actions';
import {TauxCommissionIntermediaire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TauxCommissionIntermediaireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TauxCommissionIntermediaireService: TauxCommissionIntermediaireService
    ) {
    }

    createTauxCommissionIntermediaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTauxCommissionIntermediaire),
        mergeMap((TauxCommissionIntermediaire: TauxCommissionIntermediaire) =>
            this.TauxCommissionIntermediaireService.posTauxCommissionIntermediaire(TauxCommissionIntermediaire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTauxCommissionIntermediaire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTauxCommissionIntermediaire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTauxCommissionIntermediaire),
            mergeMap((TauxCommissionIntermediaire: TauxCommissionIntermediaire) =>
                this.TauxCommissionIntermediaireService.updateTauxCommissionIntermediaire(TauxCommissionIntermediaire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTauxCommissionIntermediaire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTauxCommissionIntermediaire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTauxCommissionIntermediaire),
                mergeMap((TauxCommissionIntermediaire: TauxCommissionIntermediaire) =>
                    this.TauxCommissionIntermediaireService.deleteTauxCommissionIntermediaire(TauxCommissionIntermediaire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTauxCommissionIntermediaire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTauxCommissionIntermediaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTauxCommissionIntermediaire),
        mergeMap(() =>
            this.TauxCommissionIntermediaireService.$getTauxCommissionIntermediaires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTauxCommissionIntermediaire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
importTauxCommissionIntermediaire$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTauxCommissionIntermediaire),
    mergeMap(({file}) =>
        this.TauxCommissionIntermediaireService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTauxCommissionIntermediaire()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}