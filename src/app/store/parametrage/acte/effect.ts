import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ActeService } from './service';
import * as featureActions from './actions';
import {Acte} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ActeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ActeService: ActeService
    ) {
    }

    createActe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createActe),
        mergeMap((Acte: Acte) =>
            this.ActeService.posActe(Acte).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadActe()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateActe),
            mergeMap((Acte: Acte) =>
                this.ActeService.updateActe(Acte).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadActe()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteActe$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteActe),
                mergeMap((Acte: Acte) =>
                    this.ActeService.deleteActe(Acte).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadActe()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchActe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadActe),
        mergeMap(() =>
            this.ActeService.$getActes().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setActe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    importActe$ = createEffect(() =>
    this.actions$.pipe(
    ofType(featureActions.importActe),
    mergeMap(({file}) =>
        this.ActeService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadActe()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
));

}