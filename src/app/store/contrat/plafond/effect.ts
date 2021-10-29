import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PlafondService } from './service';
import * as featureActions from './action';
import {Plafond} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class PlafondEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private PlafondService: PlafondService
    ) {
    }

    createPlafond$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPlafond),
        mergeMap((Plafond: Plafond) =>
            this.PlafondService.posPlafond(Plafond).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg)
                   // featureActions.loadPlafond()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updatePlafond$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updatePlafond),
            mergeMap((Plafond: Plafond) =>
                this.PlafondService.updatePlafond(Plafond).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPlafond()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deletePlafond$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePlafond),
                mergeMap((Plafond: Plafond) =>
                    this.PlafondService.deletePlafond(Plafond).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadPlafond()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));  
                
                deletePlafonds$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.deletePlafonds),
                    mergeMap(({plafondList}) =>
                        this.PlafondService.deletePlafonds(plafondList).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadPlafond()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

    fetchPlafond$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPlafond),
        mergeMap(() =>
            this.PlafondService.$getPlafonds().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPlafond(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPlafond),
    mergeMap(({file}) =>
        this.PlafondService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadPlafond()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}