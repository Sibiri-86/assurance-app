import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ConsommationParSexeService} from './service';
import * as featureActions from './action';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { GlobalConfig } from 'src/app/config/global.config';
import { StatusEnum } from 'src/app/store/global-config/model';

@Injectable()
export class ConsommationParSexeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private consommationParSexeService: ConsommationParSexeService
    ) {

    }

        FetchReportRecapitulatif$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportConsommationParSexe),
            mergeMap((report: Report) =>
                this.consommationParSexeService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportConsommationParSexe({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    

   
    

}
