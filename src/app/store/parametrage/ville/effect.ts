import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { VilleService } from './service';
import * as featureActions from './actions';
import {Ville} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class VilleEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private VilleService: VilleService
    ) {
    }

    createVille$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createVille),
        mergeMap((Ville: Ville) =>
            this.VilleService.posVille(Ville).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadVille()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateVille$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateVille),
            mergeMap((Ville: Ville) =>
                this.VilleService.updateVille(Ville).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadVille()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteVille$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteVille),
                mergeMap((Ville: Ville) =>
                    this.VilleService.deleteVille(Ville).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadVille()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchVille$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadVille),
        mergeMap(() =>
            this.VilleService.$getVilles().pipe(
                switchMap(value => [
                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setVille(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

}