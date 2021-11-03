import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ArrondissementService } from './service';
import * as featureActions from './actions';
import {Arrondissement} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ArrondissementEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private arrondissementService: ArrondissementService
    ) {
    }

    createArrondissement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createArrondissement),
        mergeMap((Arrondissement: Arrondissement) =>
            this.arrondissementService.posArrondissement(Arrondissement).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadArrondissement()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateArrondissement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateArrondissement),
            mergeMap((Arrondissement: Arrondissement) =>
                this.arrondissementService.updateArrondissement(Arrondissement).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadArrondissement()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteArrondissement$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteArrondissement),
                mergeMap((Arrondissement: Arrondissement) =>
                    this.arrondissementService.deleteArrondissement(Arrondissement).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadArrondissement()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchArrondissement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadArrondissement),
        mergeMap(() =>
            this.arrondissementService.$getArrondissements().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setArrondissement(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    importArrondissement$ = createEffect(() =>
    this.actions$.pipe(
    ofType(featureActions.importArrondissement),
    mergeMap(({file}) =>
        this.arrondissementService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadArrondissement()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
));

}