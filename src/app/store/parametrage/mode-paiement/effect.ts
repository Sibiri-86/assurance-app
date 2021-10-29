import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ModePaiementService } from './service';
import * as featureActions from './actions';
import {ModePaiement} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class ModePaiementEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ModePaiementService: ModePaiementService
    ) {
    }

    createModePaiement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createModePaiement),
        mergeMap((ModePaiement: ModePaiement) =>
            this.ModePaiementService.posModePaiement(ModePaiement).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadModePaiement()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateModePaiement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateModePaiement),
            mergeMap((ModePaiement: ModePaiement) =>
                this.ModePaiementService.updateModePaiement(ModePaiement).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadModePaiement()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteModePaiement$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteModePaiement),
                mergeMap((ModePaiement: ModePaiement) =>
                    this.ModePaiementService.deleteModePaiement(ModePaiement).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadModePaiement()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchModePaiement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadModePaiement),
        mergeMap(() =>
            this.ModePaiementService.$getModePaiements().pipe(
                switchMap(value => [
                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setModePaiement(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importModePaiement),
    mergeMap(({file}) =>
        this.ModePaiementService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadModePaiement()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}