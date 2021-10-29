import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { CommuneService } from './service';
import * as featureActions from './actions';
import {Commune} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class CommuneEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private CommuneService: CommuneService
    ) {
    }

    createCommune$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createCommune),
        mergeMap((Commune: Commune) =>
            this.CommuneService.posCommune(Commune).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadCommune()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateCommune$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateCommune),
            mergeMap((Commune: Commune) =>
                this.CommuneService.updateCommune(Commune).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadCommune()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteCommune$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteCommune),
                mergeMap((Commune: Commune) =>
                    this.CommuneService.deleteCommune(Commune).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadCommune()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchCommune$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadCommune),
        mergeMap(() =>
            this.CommuneService.$getCommunes().pipe(
                switchMap(value => [
                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setCommune(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importCommune),
    mergeMap(({file}) =>
        this.CommuneService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadCommune()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}