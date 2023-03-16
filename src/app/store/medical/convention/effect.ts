import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';
import { ConventionService } from './service';
import { Convention } from './model';

@Injectable()
export class ConventionEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private conventionService: ConventionService
    ) {
    }

    createConvention$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createConvention),
        mergeMap((convention: Convention) =>
            this.conventionService.$posConvention(convention).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadConvention()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    updateConvention$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.updateConvention),
        mergeMap((convention: Convention) =>
            this.conventionService.$putConvention(convention).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadConvention()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));
        
        deleteConvention$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deleteConvention),
            mergeMap((convention: Convention) =>
                this.conventionService.$deleteConvention(convention).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadConvention()
                    ]),
                    catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

    fetchConvention$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadConvention),
            mergeMap(() =>
                this.conventionService.$getConvention().pipe(
                    switchMap(value => [
                        //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setConvention(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
        );

        fetchConventionPrestataire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadConventionPrestataire),
            mergeMap(({code}) =>
                this.conventionService.$getConventionPrestataire(code).pipe(
                    switchMap(value => [
                        //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setConvention(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
 
        );

        importPhotosConvention$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.importCondition),
                mergeMap(({file, idConvention}) =>
                    this.conventionService.pushPhotosConvention(file, idConvention).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadConvention()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
        );
        
}
