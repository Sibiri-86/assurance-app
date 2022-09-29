import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import {TiersService} from './service';
import {Tiers} from './model';


@Injectable()
export class TiersEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private tiersService: TiersService
    ) {
    }

createTiers$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTiers),
        mergeMap((Tiers: Tiers) =>
            this.tiersService.postTiers(Tiers).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTiers()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                
            ))
        ));

        updateTiers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTiers),
            mergeMap((Tiers: Tiers) =>
                this.tiersService.updateTiers(Tiers).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTiers()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

    fetchAppelFonds$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadTiers),
                mergeMap(() =>
                    this.tiersService.$getTierss().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setTiers(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
    );

    /* fetchReportAppelFond$ = createEffect(() =>
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
        )); */

}
