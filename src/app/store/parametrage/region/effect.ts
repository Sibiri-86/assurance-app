import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { RegionService } from './service';
import * as featureActions from './actions';
import {Region} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class RegionEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private RegionService: RegionService
    ) {
    }

    createRegion$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createRegion),
        mergeMap((Region: Region) =>
            this.RegionService.posRegion(Region).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadRegion()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateRegion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateRegion),
            mergeMap((Region: Region) =>
                this.RegionService.updateRegion(Region).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadRegion()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteRegion$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteRegion),
                mergeMap((Region: Region) =>
                    this.RegionService.deleteRegion(Region).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadRegion()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchRegion$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadRegion),
        mergeMap(() =>
            this.RegionService.$getRegions().pipe(
                switchMap(value => [
                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setRegion(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importRegion),
    mergeMap(({file}) =>
        this.RegionService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadRegion()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}