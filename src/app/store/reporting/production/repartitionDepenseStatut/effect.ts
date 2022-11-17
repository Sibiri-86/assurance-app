import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './action';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { GlobalConfig } from 'src/app/config/global.config';
import { StatusEnum } from 'src/app/store/global-config/model';
import { RepartitionDepenseStatutService } from './service';

@Injectable()
export class RepartitionDepenseStatutEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private repartitionDepenseService: RepartitionDepenseStatutService
    ) {

    }

        FetchReportRecapitulatif$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportRepartitionDepenseStatut),
            mergeMap((report: Report) =>
                this.repartitionDepenseService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportRepartitionDepenseStatut({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    

   
    

}
