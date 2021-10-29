import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TypePrimeService } from './service';
import * as featureActions from './actions';
import {TypePrime} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TypePrimeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TypePrimeService: TypePrimeService
    ) {
    }

    createTypePrime$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTypePrime),
        mergeMap((TypePrime: TypePrime) =>
            this.TypePrimeService.posTypePrime(TypePrime).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTypePrime()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTypePrime$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTypePrime),
            mergeMap((TypePrime: TypePrime) =>
                this.TypePrimeService.updateTypePrime(TypePrime).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTypePrime()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTypePrime$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTypePrime),
                mergeMap((TypePrime: TypePrime) =>
                    this.TypePrimeService.deleteTypePrime(TypePrime).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTypePrime()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTypePrime$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTypePrime),
        mergeMap(() =>
            this.TypePrimeService.$getTypePrimes().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTypePrime(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTypePrime),
    mergeMap(({file}) =>
        this.TypePrimeService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTypePrime()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}