import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { JournauxService } from './service';
import * as featureActions from './actions';
import { Journaux } from './model';
import { Report } from '../../contrat/police/model';

@Injectable()
export class JournauxEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private journauxService: JournauxService,
    ) {
    }

    createJournaux$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createJournaux),
        mergeMap((journaux:  Journaux) =>
            this.journauxService.posJournaux(journaux).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadJournaux()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateJournaux$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateJournaux),
            mergeMap((journaux: Journaux) =>
                this.journauxService.updateJournaux(journaux).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadJournaux()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

         

            deleteJournaux$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteJournaux),
                mergeMap((journaux: Journaux) =>
                    this.journauxService.deleteJournaux(journaux).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadJournaux()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchJournaux$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadJournaux),
        mergeMap(() =>
            this.journauxService.$getJournaux().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setJournaux(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    

   

   

importJournaux$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importJournaux),
    mergeMap(({file}) =>
        this.journauxService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadJournaux()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

fetchReportBalanceHuit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportBalanceHuit),
            mergeMap((report: Report) =>
                this.journauxService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportBalanceHuit({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
}