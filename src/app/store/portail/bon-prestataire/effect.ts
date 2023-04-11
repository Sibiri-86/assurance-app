import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './action';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { Report } from '../../contrat/police/model';
import { BonPrestataireService } from './service';

@Injectable()
export class BonPrestataireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private bonPrestataireService: BonPrestataireService
    ) {
    }
   
   
    createBonPrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createBonPrestataire),
        mergeMap((bonPrestataire) =>
            this.bonPrestataireService.posBonPrestataire(bonPrestataire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadBonPrestataire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        loadBonPrestataire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadBonPrestataire),
            mergeMap(() =>
                this.bonPrestataireService.$getBonPrestataire().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setBonPrestataire(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            }
