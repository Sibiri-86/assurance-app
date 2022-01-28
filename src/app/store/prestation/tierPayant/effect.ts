import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TierPayantService} from './service';
import * as featureActions from './action';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import {Report} from '../../contrat/police/model';

@Injectable()
export class TierPayantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private tierPayantService: TierPayantService
    ) {
    }

    createTierPayant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTierPayant),
        mergeMap(({tierPayant}) =>
            this.tierPayantService.posTierPayant(tierPayant).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTierPayant()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    loadTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayant),
            mergeMap(() =>
                this.tierPayantService.$getTierPayant().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    fetchReportTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportTierPayant),
            mergeMap((report: Report) =>
                this.tierPayantService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportTierPayant({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
}
