import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { RecapitulatifService} from './service';
import * as featureActions from './action';
import { Recapitulatif } from './model';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { GlobalConfig } from 'src/app/config/global.config';
import { StatusEnum } from 'src/app/store/global-config/model';

@Injectable()
export class RecapitulatifEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private recaptitulatifService: RecapitulatifService
    ) {

    }

        FetchReportRecapitulatif$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportRecapitulatif),
            mergeMap((report: Report) =>
                this.recaptitulatifService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportRecapitulatif({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    

   
    

}
