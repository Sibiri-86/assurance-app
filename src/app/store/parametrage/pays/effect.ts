import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PaysService } from './service';
import * as featureActions from './actions';
import {Pays} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class PaysEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private PaysService: PaysService
    ) {
    }

    createPays$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPays),
        mergeMap((Pays: Pays) =>
            this.PaysService.posPays(Pays).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPays()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updatePays$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updatePays),
            mergeMap((Pays: Pays) =>
                this.PaysService.updatePays(Pays).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPays()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deletePays$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePays),
                mergeMap((Pays: Pays) =>
                    this.PaysService.deletePays(Pays).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadPays()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchPays$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPays),
        mergeMap(() =>
            this.PaysService.$getPayss().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPays(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPays),
    mergeMap(({file}) =>
        this.PaysService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadPays()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}