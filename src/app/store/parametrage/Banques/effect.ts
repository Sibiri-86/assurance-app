import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { BanqueService } from './service';
import * as featureActions from './actions';
import {Banque} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BanqueEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private banqueService: BanqueService
    ) {
    }

    createBanque$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createBanque),
        mergeMap((Banque: Banque) =>
            this.banqueService.posBanque(Banque).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadBanque()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateBanque$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateBanque),
            mergeMap((Banque: Banque) =>
                this.banqueService.updateBanque(Banque).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadBanque()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteBanque$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteBanque),
                mergeMap((Banque: Banque) =>
                    this.banqueService.deleteBanque(Banque).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadBanque()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchBanque$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadBanque),
        mergeMap(() =>
            this.banqueService.$getBanques().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setBanque(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    importBanque$ = createEffect(() =>
    this.actions$.pipe(
    ofType(featureActions.importBanque),
    mergeMap(({file}) =>
        this.banqueService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadBanque()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
));

}