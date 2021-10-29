import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TerritorialiteService } from './service';
import * as featureActions from './actions';
import {Territorialite} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TerritorialiteEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TerritorialiteService: TerritorialiteService
    ) {
    }

    createTerritorialite$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTerritorialite),
        mergeMap((Territorialite: Territorialite) =>
            this.TerritorialiteService.posTerritorialite(Territorialite).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTerritorialite()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTerritorialite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTerritorialite),
            mergeMap((Territorialite: Territorialite) =>
                this.TerritorialiteService.updateTerritorialite(Territorialite).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTerritorialite()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTerritorialite$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTerritorialite),
                mergeMap((Territorialite: Territorialite) =>
                    this.TerritorialiteService.deleteTerritorialite(Territorialite).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTerritorialite()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTerritorialite$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTerritorialite),
        mergeMap(() =>
            this.TerritorialiteService.$getTerritorialites().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTerritorialite(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTerritorialite),
    mergeMap(({file}) =>
        this.TerritorialiteService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTerritorialite()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}