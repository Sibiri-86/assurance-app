import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TypeJournaux} from './model';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { TypeJournauxService } from './service';
import * as featureActions from './actions';

@Injectable()
export class TypeJournauxEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private typeJournauxService: TypeJournauxService,
    ) {
    }

    createTypeJournaux$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTypeJournaux),
        mergeMap((typeJournaux:  TypeJournaux) =>
            this.typeJournauxService.posTypeJournaux(typeJournaux).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTypeJournaux()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTypeJournaux$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTypeJournaux),
            mergeMap((typeJournaux: TypeJournaux) =>
                this.typeJournauxService.updateTypeJournaux(typeJournaux).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTypeJournaux()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

         

            deleteTypeJournaux$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTypeJournaux),
                mergeMap((typeJournaux: TypeJournaux) =>
                    this.typeJournauxService.deleteTypeJournaux(typeJournaux).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTypeJournaux()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTypeJournaux$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTypeJournaux),
        mergeMap(() =>
            this.typeJournauxService.$getTypeJournaux().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTypeJournaux(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    

   

   

importTypeJournaux$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTypeJournaux),
    mergeMap(({file}) =>
        this.typeJournauxService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTypeJournaux()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);
}