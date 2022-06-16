import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { StatusService } from './service';
import * as featureActions from './actions';
import {Status} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class StatusEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private StatusService: StatusService
    ) {
    }

    createStatus$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createStatus),
        mergeMap((Status: Status) =>
            this.StatusService.posStatus(Status).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadStatus()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateStatus),
            mergeMap((Status: Status) =>
                this.StatusService.updateStatus(Status).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadStatus()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteStatus$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteStatus),
                mergeMap((Status: Status) =>
                    this.StatusService.deleteStatus(Status).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadStatus()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchStatus$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadStatus),
        mergeMap(() =>
            this.StatusService.$getStatuss().pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setStatus(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importStatus),
    mergeMap(({file}) =>
        this.StatusService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadStatus()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}