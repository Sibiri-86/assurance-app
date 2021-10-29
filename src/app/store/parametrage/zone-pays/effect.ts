import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ZonePaysService } from './service';
import * as featureActions from './actions';
import {ZonePays} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class ZonePaysEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ZonePaysService: ZonePaysService
    ) {
    }

    createZonePays$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createZonePays),
        mergeMap((ZonePays: ZonePays) =>
            this.ZonePaysService.posZonePays(ZonePays).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadZonePays()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateZonePays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateZonePays),
            mergeMap((ZonePays: ZonePays) =>
                this.ZonePaysService.updateZonePays(ZonePays).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadZonePays()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteZonePays$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteZonePays),
                mergeMap((ZonePays: ZonePays) =>
                    this.ZonePaysService.deleteZonePays(ZonePays).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadZonePays()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchZonePays$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadZonePays),
        mergeMap(() =>
            this.ZonePaysService.$getZonePayss().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setZonePays(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importZonePays),
    mergeMap(({file}) =>
        this.ZonePaysService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadZonePays()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}