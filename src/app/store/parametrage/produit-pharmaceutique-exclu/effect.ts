import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ProduitPharmaceutiqueExcluService } from './service';
import * as featureActions from './actions';
import {ProduitPharmaceutiqueExclu} from './model';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class ProduitPharmaceutiqueExcluEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ProduitPharmaceutiqueExcluService: ProduitPharmaceutiqueExcluService
    ) {
    }

    createProduitPharmaceutique$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createProduitPharmaceutiqueExclu),
        mergeMap((ProduitPharmaceutique: ProduitPharmaceutiqueExclu) =>
            this.ProduitPharmaceutiqueExcluService.posProduitPharmaceutiqueExclu(ProduitPharmaceutique).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadProduitPharmaceutiqueExclu()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateProduitPharmaceutique$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateProduitPharmaceutiqueExclu),
            mergeMap((ProduitPharmaceutique: ProduitPharmaceutiqueExclu) =>
                this.ProduitPharmaceutiqueExcluService.updateProduitPharmaceutiqueExclu(ProduitPharmaceutique).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadProduitPharmaceutiqueExclu()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteProduitPharmaceutique$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteProduitPharmaceutiqueExclu),
                mergeMap((ProduitPharmaceutique: ProduitPharmaceutiqueExclu) =>
                    this.ProduitPharmaceutiqueExcluService.deleteProduitPharmaceutiqueExclu(ProduitPharmaceutique).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadProduitPharmaceutiqueExclu()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchProduitPharmaceutique$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadProduitPharmaceutiqueExclu),
        mergeMap(() =>
            this.ProduitPharmaceutiqueExcluService.$getProduitPharmaceutiquesExclu().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setProduitPharmaceutiqueExclu(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importProduitPharmaceutiqueExclu),
    mergeMap(({file}) =>
        this.ProduitPharmaceutiqueExcluService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadProduitPharmaceutiqueExclu()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);


}