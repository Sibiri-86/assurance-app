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
                        featureActions.setHistoriqueAvenant({historiqueAvenantList: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    fetchHistoriquePlafond$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadHistoriquePlafondGroupe),
            mergeMap(({avanantId, grpId}) =>
                this.historiqueAvenantService.getHistoriquePlafonds(avanantId, grpId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenant({historiqueAvenantList: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    fetchHistoriquePlafondSousActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadHistoriquePlafondSousActe),
            mergeMap(({avanantId, grpId}) =>
                this.historiqueAvenantService.getHistoriquePlafondSousActes(avanantId, grpId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenant({historiqueAvenantList: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    fetchHistoriquePlafondFamilleActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadHistoriquePlafondFamilleActe),
            mergeMap(({avanantId, grpId}) =>
                this.historiqueAvenantService.getHistoriquePlafondFamilleActes(avanantId, grpId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenant({historiqueAvenantList: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    fetchHistoriquePlafondActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadHistoriquePlafondActe),
            mergeMap(({avanantId, grpId}) =>
                this.historiqueAvenantService.getHistoriquePlafondActes(avanantId, grpId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenant({historiqueAvenantList: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    getHistoriqueAvenantWithoutActive$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadHistoriquePlafondActeWithoutActive),
            mergeMap(({policeId}) =>
                this.historiqueAvenantService.getHistoriqueAvenantWithoutActive(policeId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenantWithoutActive({historiqueAvenantListWithoutActive: value.body})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    createHistoriqueAvenantFile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.createHistoriqueAvenantFile),
            mergeMap(({historiqueAvenant, file}) =>
                this.historiqueAvenantService.postHistoriqueAvenantFile(historiqueAvenant, file).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadHistoriqueAvenant({policeId: historiqueAvenant.police.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    findHistoriqueAvenantByExercice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadHistoriqueAvenantByExercice),
            mergeMap(({exerciceId}) =>
                this.historiqueAvenantService.findHistoriqueAvenantByExercice(exerciceId).pipe(
                    switchMap(value => [
                        featureActions.setHistoriqueAvenantByExercice({historiqueAvenantListByExercie: value.body})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        ));

    /*misAJoursHistoriqueAvenant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.misAJours),
            mergeMap((ha: HistoriqueAvenant) =>
                this.historiqueAvenantService.misAJoursHistoriqueAvenant(ha).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadHistoriqueAvenant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));*/
}
