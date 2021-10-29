import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TypeIntermediaireService } from './service';
import * as featureActions from './actions';
import {TypeIntermediaire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TypeIntermediaireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TypeIntermediaireService: TypeIntermediaireService
    ) {
    }

    createTypeIntermediaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTypeIntermediaire),
        mergeMap((TypeIntermediaire: TypeIntermediaire) =>
            this.TypeIntermediaireService.posTypeIntermediaire(TypeIntermediaire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTypeIntermediaire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTypeIntermediaire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTypeIntermediaire),
            mergeMap((TypeIntermediaire: TypeIntermediaire) =>
                this.TypeIntermediaireService.updateTypeIntermediaire(TypeIntermediaire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTypeIntermediaire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTypeIntermediaire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTypeIntermediaire),
                mergeMap((TypeIntermediaire: TypeIntermediaire) =>
                    this.TypeIntermediaireService.deleteTypeIntermediaire(TypeIntermediaire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTypeIntermediaire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTypeIntermediaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTypeIntermediaire),
        mergeMap(() =>
            this.TypeIntermediaireService.$getTypeIntermediaires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTypeIntermediaire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTypeIntermediaire),
    mergeMap(({file}) =>
        this.TypeIntermediaireService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTypeIntermediaire()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}