import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { FacturePrestatairesService} from './service';
import * as featureActions from './action';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { GlobalConfig } from 'src/app/config/global.config';
import { StatusEnum } from 'src/app/store/global-config/model';

@Injectable()
export class FacturePrestatairesEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private facturePrestatairesService: FacturePrestatairesService
    ) {

    }

        FetchReportRecapitulatif$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportFacturePrestataires),
            mergeMap((report: Report) =>
                this.facturePrestatairesService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportFacturePrestataires({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    

   
    

}
