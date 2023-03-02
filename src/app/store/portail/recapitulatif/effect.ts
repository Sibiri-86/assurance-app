import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './action';
import { Recapitulatif } from './model';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { GlobalConfig } from 'src/app/config/global.config';
import { StatusEnum } from 'src/app/store/global-config/model';
import { PortailService } from './service';
import { ProduitPharmaceutiqueExcluEntite } from '../../parametrage/produit-pharmaceutique-exclu/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PortailEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private portailService: PortailService
    ) {

    }

        /* FetchReportRecapitulatif$ = createEffect(() =>
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
        )); */
    
        fetchProduitPharmaceutiqueExclu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadProduitPharmaceutiqueExclu),
            mergeMap(() =>
                this.portailService.$getProduitPharmaceutiqueExclu().pipe(
                    switchMap(value => [
                        //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setProduitPharmaceutiqueExclu(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
        );

        createProduitPharmaceutiqueExclu$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createProduitPharmaceutiqueExclu),
        mergeMap((produit: ProduitPharmaceutiqueExcluEntite) =>
            this.portailService.postProduitPharmaceutiqueExclu(produit).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadProduitPharmaceutiqueExclu()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

   
    

}
