import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { AdherentService } from './service';
import * as featureActions from './actions';
import {Adherent, AdherentFamille} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class AdherentEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private AdherentService: AdherentService
    ) {
    }

    createAdherent$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createAdherent),
        mergeMap((Adherent: Adherent) =>
            this.AdherentService.posAdherent(Adherent).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadAdherent({idGroupe: Adherent.groupe.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        createAdherentWithFamille$ = createEffect(() =>
        this.actions$.pipe(
        ofType(featureActions.createAdherentwithFamille),
        mergeMap((adherent: AdherentFamille) =>
            this.AdherentService.posAdherentWithFamille(adherent).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadAdherent({idGroupe: adherent.adherent.groupe.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateAdherent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateAdherent),
            mergeMap((Adherent: Adherent) =>
                this.AdherentService.updateAdherent(Adherent).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadAdherent({idGroupe: Adherent.groupe.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

        deleteAdherent$ = createEffect(() =>
        this.actions$.pipe(
                ofType(featureActions.deleteAdherent),
                mergeMap((Adherent: Adherent) =>
                    this.AdherentService.deleteAdherent(Adherent).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadAdherent({idGroupe: Adherent.groupe.id})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

    
    fetchAdherent$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAdherent),
        mergeMap(({idGroupe}) =>
            this.AdherentService.$getAdherents(idGroupe).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setAdherent(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importAdherent),
    mergeMap(({file}) =>
        this.AdherentService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
               // featureActions.loadAdherent()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}