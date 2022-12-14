import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './action';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { GlobalConfig } from 'src/app/config/global.config';
import { StatusEnum } from 'src/app/store/global-config/model';
import { StatistiqueTrancheAgeService } from './service';

@Injectable()
export class StatistiqueParTrancheAgeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private statistiqueTrancheAgeService: StatistiqueTrancheAgeService
    ) {

    }

        FetchStatistiqueTrancheAge$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportStatistiqueParTrancheAge),
            mergeMap((report: Report) =>
                this.statistiqueTrancheAgeService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportStatistiqueParTrancheAge({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    

   
    

}
