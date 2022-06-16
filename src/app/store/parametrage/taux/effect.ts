import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TauxService } from './service';
import * as featureActions from './actions';
import {Taux} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TauxEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TauxService: TauxService
    ) {
    }

    createTaux$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTaux),
        mergeMap((Taux: Taux) =>
            this.TauxService.posTaux(Taux).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTaux()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTaux$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTaux),
            mergeMap((Taux: Taux) =>
                this.TauxService.updateTaux(Taux).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTaux()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTaux$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTaux),
                mergeMap((Taux: Taux) =>
                    this.TauxService.deleteTaux(Taux).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTaux()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTaux$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTaux),
        mergeMap(() =>
            this.TauxService.$getTauxs().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTaux(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
importTaux$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTaux),
    mergeMap(({file}) =>
        this.TauxService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTaux()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}