import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ProduitPharmaceutiqueService } from './service';
import * as featureActions from './actions';
import {ProduitPharmaceutique} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class ProduitPharmaceutiqueEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ProduitPharmaceutiqueService: ProduitPharmaceutiqueService
    ) {
    }

    createProduitPharmaceutique$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createProduitPharmaceutique),
        mergeMap((ProduitPharmaceutique: ProduitPharmaceutique) =>
            this.ProduitPharmaceutiqueService.posProduitPharmaceutique(ProduitPharmaceutique).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadProduitPharmaceutique()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateProduitPharmaceutique$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateProduitPharmaceutique),
            mergeMap((ProduitPharmaceutique: ProduitPharmaceutique) =>
                this.ProduitPharmaceutiqueService.updateProduitPharmaceutique(ProduitPharmaceutique).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadProduitPharmaceutique()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteProduitPharmaceutique$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteProduitPharmaceutique),
                mergeMap((ProduitPharmaceutique: ProduitPharmaceutique) =>
                    this.ProduitPharmaceutiqueService.deleteProduitPharmaceutique(ProduitPharmaceutique).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadProduitPharmaceutique()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchProduitPharmaceutique$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadProduitPharmaceutique),
        mergeMap(() =>
            this.ProduitPharmaceutiqueService.$getProduitPharmaceutiques().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setProduitPharmaceutique(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importProduitPharmaceutique),
    mergeMap(({file}) =>
        this.ProduitPharmaceutiqueService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadProduitPharmaceutique()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}