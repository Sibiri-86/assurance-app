import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { AppelFondService} from './service';
import {AppelFond} from './model';
import { Report } from '../../contrat/police/model';


@Injectable()
export class AppelFondEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private appelfondService: AppelFondService
    ) {
    }

createAppelFond$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createAppelFond),
        mergeMap((AppelFond: AppelFond) =>
            this.appelfondService.postAppelFond(AppelFond).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadAppelFond()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                
            ))
        ));

        updateAppelFond$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateAppelFond),
            mergeMap((AppelFond: AppelFond) =>
                this.appelfondService.updateAppelFond(AppelFond).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadAppelFond()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

    fetchAppelFonds$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadAppelFond),
                mergeMap(() =>
                    this.appelfondService.$getAppelFonds().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setAppelFond(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
    );

    fetchReportAppelFond$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportAppelFond),
            mergeMap((report: Report) =>
                this.appelfondService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportAppelFond({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

}
