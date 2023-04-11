import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {  RemboursementService } from './service';
import * as featureActions from './action';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { Report } from '../../contrat/police/model';

@Injectable()
export class RemboursementEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private remboursementService: RemboursementService
    ) {
    }
   
   
    createRemboursement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createRemboursement),
        mergeMap(({idAdherent, typePaiement, numeroOrange, numeroMobicash, numeroVirement, nomBenefiniciaire, files}) =>
            this.remboursementService.posRemboursement(idAdherent,typePaiement, numeroOrange, numeroMobicash, numeroVirement, nomBenefiniciaire,files).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadRemboursement()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        loadRemboursement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadRemboursement),
            mergeMap(() =>
                this.remboursementService.$getRemboursement().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setRemboursement(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            ValiderRemboursementPrestation$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.ValiderRemboursementPrestation),
                mergeMap((remboursement) =>
                    this.remboursementService.validerRemboursementPrestataion(remboursement).pipe(
                        switchMap(value => [
                            // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadRemboursementPrestation()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

            ValiderRemboursementMedical$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.ValiderRemboursementMedical),
                mergeMap((remboursement) =>
                    this.remboursementService.validerRemboursementPrestataion(remboursement).pipe(
                        switchMap(value => [
                            // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadRemboursementMedical()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));
        loadRemboursementPrestation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadRemboursementPrestation),
            mergeMap(() =>
                this.remboursementService.$getRemboursementPrestation().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setRemboursement(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));
               
            loadRemboursementMedical$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadRemboursementMedical),
                mergeMap(() =>
                    this.remboursementService.$getRemboursementMedical().pipe(
                        switchMap(value => [
                            // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setRemboursement(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));
                                
}
