import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PrestataireService } from './service';
import * as featureActions from './actions';
import {Prestataire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class PrestataireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private PrestataireService: PrestataireService
    ) {
    }

    createPrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPrestataire),
        mergeMap((Prestataire: Prestataire) =>
            this.PrestataireService.posPrestataire(Prestataire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPrestataire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updatePrestataire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updatePrestataire),
            mergeMap((Prestataire: Prestataire) =>
                this.PrestataireService.updatePrestataire(Prestataire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPrestataire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deletePrestataire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePrestataire),
                mergeMap((Prestataire: Prestataire) =>
                    this.PrestataireService.deletePrestataire(Prestataire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadPrestataire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchPrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPrestataire),
        mergeMap(() =>
            this.PrestataireService.$getPrestataires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPrestataire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPrestataire),
    mergeMap(({file}) =>
        this.PrestataireService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadPrestataire()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}