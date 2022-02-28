import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HistoriqueAvenantAdherentService} from './service';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class HistoriqueAvenantAdherantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private historiqueAvenantAdherantService: HistoriqueAvenantAdherentService
    ) {
    }

 /*   createHistoriqueAvenant$ = createEffect(() =>
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
                ));*/

        fetchHistoriqueAvenant$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.loadHistoriqueAvenantAdherent),
            mergeMap(({haId}) =>
                this.historiqueAvenantAdherantService.getHistoriqueAvenantAdherents(haId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenantAdherent(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

        fetchHistoriqueAvenantByHistoriqueIdAndTypeHistorique$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.loadHistoriqueAvenantAdherentByHistoriqueIdAndTypeHistorique),
            mergeMap(({typeHistoriqueAvenant, haId}) => this.historiqueAvenantAdherantService
                    .getHistoriqueAvenantAdherentsByHistoriqueIdAndTypeHistorique(typeHistoriqueAvenant, haId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenantAdherent(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

        fetchHistoriqueAvenantByHistoriqueIdAndActifIsFalse$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.LoadHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse),
            mergeMap(({haId}) => this.historiqueAvenantAdherantService
                .findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(haId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenantAdherent(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

        /* fetchgetAvenantModificationInfo$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.loadAvenantModificationInfos),
            mergeMap(({typeHistoriqueAvenant, haId, policeId}) => this.historiqueAvenantAdherantService
                .getAvenantModificationInfo(typeHistoriqueAvenant, haId, policeId).pipe(
                    switchMap(value => [
                        featureActions.setAvenantModificationInfos(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )); */
}
