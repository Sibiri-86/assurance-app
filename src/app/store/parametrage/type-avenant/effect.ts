import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TypeAvenantService } from './service';
import * as featureActions from './actions';
import {TypeAvenant} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TypeAvenantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TypeAvenantService: TypeAvenantService
    ) {
    }

    createTypeAvenant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTypeAvenant),
        mergeMap((TypeAvenant: TypeAvenant) =>
            this.TypeAvenantService.posTypeAvenant(TypeAvenant).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTypeAvenant()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTypeAvenant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTypeAvenant),
            mergeMap((TypeAvenant: TypeAvenant) =>
                this.TypeAvenantService.updateTypeAvenant(TypeAvenant).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTypeAvenant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTypeAvenant$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTypeAvenant),
                mergeMap((TypeAvenant: TypeAvenant) =>
                    this.TypeAvenantService.deleteTypeAvenant(TypeAvenant).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTypeAvenant()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTypeAvenant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTypeAvenant),
        mergeMap(() =>
            this.TypeAvenantService.$getTypeAvenants().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTypeAvenant(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTypeAvenant),
    mergeMap(({file}) =>
        this.TypeAvenantService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTypeAvenant()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}