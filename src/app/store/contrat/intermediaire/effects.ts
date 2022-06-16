import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { IntermediaireService } from './service';
import * as featureActions from './actions';
import {Intermediaire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class IntermediaireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private IntermediaireService: IntermediaireService
    ) {
    }

    createIntermediaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createIntermediaire),
        mergeMap((Intermediaire: Intermediaire) =>
            this.IntermediaireService.posIntermediaire(Intermediaire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadIntermediaire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateIntermediaire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateIntermediaire),
            mergeMap((Intermediaire: Intermediaire) =>
                this.IntermediaireService.updateIntermediaire(Intermediaire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadIntermediaire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteIntermediaire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteIntermediaire),
                mergeMap((Intermediaire: Intermediaire) =>
                    this.IntermediaireService.deleteIntermediaire(Intermediaire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadIntermediaire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchIntermediaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadIntermediaire),
        mergeMap(() =>
            this.IntermediaireService.$getIntermediaires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setIntermediaire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    deleteIntermediaires$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.deleteIntermediaires),
                    mergeMap(({intermediaireList}) =>
                        this.IntermediaireService.deleteIntermediaires(intermediaireList).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadIntermediaire()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importIntermediaire),
    mergeMap(({file}) =>
        this.IntermediaireService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadIntermediaire()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}