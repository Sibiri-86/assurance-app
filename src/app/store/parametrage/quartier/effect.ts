import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { SousActe } from '../sous-acte/model';
import { QuartierService } from './service';
import { Quartier } from './model';

@Injectable()
export class QuartierEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private quartierService: QuartierService
    ) {
    }

    createQuartier$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createQuartier),
        mergeMap((quartier: Quartier) =>
            this.quartierService.posQuartier(quartier).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadQuartier()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateQuartier$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateQuartier),
            mergeMap((quartier: Quartier) =>
                this.quartierService.updateQuartier(quartier).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadQuartier()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

         

            deleteQuartier$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteQuartier),
                mergeMap((quartier: Quartier) =>
                    this.quartierService.deleteQuartier(quartier).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadQuartier()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchQuartier$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadQuartier),
        mergeMap(() =>
            this.quartierService.$getQuartier().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setQuartier(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    

    

importQuartier$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importQuartier),
    mergeMap(({file}) =>
        this.quartierService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadQuartier()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);
}