import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique, Report} from './model';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrdonnanceMedicaleService } from './service';

@Injectable()
export class OrdonnanceMedicaleEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ordonnanceMedicaleService: OrdonnanceMedicaleService
    ) {
    }

    createOrdonnance$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createOrdonnance),
        mergeMap((ordonnace: OrdonnanceMedical) =>
            this.ordonnanceMedicaleService.postOrdonnanceMedicale(ordonnace).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadOrdonnance()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        fetchBon$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadOrdonnance),
        mergeMap(() =>
            this.ordonnanceMedicaleService.$getOrdonnanceMedicale().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setOrdonnance(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchReportOrdonnance$ = createEffect(() =>
                            this.actions$.pipe(
                                ofType(featureActions.FetchReportOrdonnance),
                                mergeMap((report: Report) =>
                                    this.ordonnanceMedicaleService.$getReportOrdonnance(report).pipe(
                                        switchMap(value => [
                                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                            featureActions.setReportOrdonnance({reportFile: value})
                                        ]),
                                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    ))
                                ));

      updateOrdonnance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateOrdonnance),
            mergeMap((ordonnace: OrdonnanceMedical) =>
                this.ordonnanceMedicaleService.updateOrdonnanceMedicale(ordonnace).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadOrdonnance()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            /** delete Ordonnance */
    deleteOrdonnanceMedicale$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.deleteOrdonnanceMedical),
        mergeMap(({ordonnance}) =>
            this.ordonnanceMedicaleService.deleteOrdonnanceMedicale(ordonnance).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadOrdonnance()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));

    /** delete Ordonnance Medicale Produit Pharmaceutique */
    deleteOrdonnanceMedicaleProduitPharmaceutique$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.deleteOrdonnanceMedicalProduit),
        mergeMap((ordonnance: OrdonnanceMedicalProduitPharmaceutique) =>
            this.ordonnanceMedicaleService.deleteOrdonnanceMedicaleProduit(ordonnance).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadOrdonnance()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
    ));


}
