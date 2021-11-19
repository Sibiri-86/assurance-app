import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { HistoriqueAvenantService} from './service';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import {HistoriqueAvenant} from "./model";

@Injectable()
export class HistoriqueAvenantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private historiqueAvenantService: HistoriqueAvenantService
    ) {
    }

    createHistoriqueAvenant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createHistoriqueAvenant),
        mergeMap((historiqueAvenant: HistoriqueAvenant) =>
            this.historiqueAvenantService.postHistoriqueAvenant(historiqueAvenant).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadHistoriqueAvenant({policeId: historiqueAvenant.police.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateHistoriqueAvenant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateHistoriqueAvenant),
            mergeMap((historiqueAvenant: HistoriqueAvenant) =>
                this.historiqueAvenantService.updateHistoriqueAvenant(historiqueAvenant).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadHistoriqueAvenant({policeId: historiqueAvenant.police.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

        deleteHistoriqueAvenant$ = createEffect(() =>
        this.actions$.pipe(
                ofType(featureActions.deleteHistoriqueAvenant),
                mergeMap((historiqueAvenant: HistoriqueAvenant) =>
                    this.historiqueAvenantService.deleteHistoriqueAvenant(historiqueAvenant).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadHistoriqueAvenant({policeId: historiqueAvenant.police.id})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

        fetchHistoriqueAvenant$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.loadHistoriqueAvenant),
            mergeMap(({policeId}) =>
                this.historiqueAvenantService.getHistoriqueAvenants(policeId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));
}
