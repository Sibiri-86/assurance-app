import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PlafondService } from './service';
import * as featureActions from './action';
import {Bareme, Plafond} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { Groupe } from '../groupe/model';

@Injectable()
export class PlafondEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private PlafondService: PlafondService
    ) {
    }

    createPlafond$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPlafond),
        mergeMap((Plafond: Plafond) =>
            this.PlafondService.posPlafond(Plafond).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                   featureActions.loadPlafondGroupe(Plafond.groupe)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updatePlafond$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updatePlafond),
            mergeMap((Plafond: Plafond) =>
                this.PlafondService.updatePlafond(Plafond).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPlafond()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deletePlafond$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePlafond),
                mergeMap((Plafond: Plafond) =>
                    this.PlafondService.deletePlafond(Plafond).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadPlafond()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));  
                
                deletePlafonds$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.deletePlafonds),
                    mergeMap(({plafondList}) =>
                        this.PlafondService.deletePlafonds(plafondList).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadPlafond()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

    fetchPlafond$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPlafond),
        mergeMap(() =>
            this.PlafondService.$getPlafonds().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPlafond(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchPlafondGroupe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPlafondGroupe),
        mergeMap((groupe: Groupe) =>
            this.PlafondService.$getPlafondsByGroupe(groupe).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPlafondGroupe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPlafond),
    mergeMap(({file}) =>
        this.PlafondService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadPlafond()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

    /**effects pour les baremes */
    createBareme$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createBareme),
        mergeMap((bareme: Bareme) =>
            this.PlafondService.postBareme(bareme).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                   featureActions.loadBareme()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        updateBareme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateBareme),
            mergeMap((bareme: Bareme) =>
                this.PlafondService.updateBareme(bareme).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadBareme()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            fetchBareme$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadBareme),
                mergeMap(() =>
                    this.PlafondService.$getBaremes().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setBareme(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
            );
            /**recuperer la configuration du bareme par type bareme et taux */
            fetchBaremeConfig$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadPlafondConfig),
                mergeMap(({typeBareme, taux}) =>
                    this.PlafondService.$getBaremesConfig(typeBareme, taux).pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setPlafondConfig(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
            );


            deleteBareme$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteBareme),
                mergeMap((bareme: Bareme) =>
                    this.PlafondService.deleteBareme(bareme).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadBareme()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

    /* Recherche de la famille d'acte auquel a droit un assuré*/
    searchAssure = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadFamilleActeEnCours),
            mergeMap(({numero}) =>
                this.PlafondService.getPlafondEnCours(numero).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setPlafondGroupeFamilleActe({plafondEnCours: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
    );

    /* Recherche de l'acte auquel a droit un assuré*/
    searchAssureActe = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadActeEnCours),
            mergeMap(({idPGFA}) =>
                this.PlafondService.getPlafondActeEnCours(idPGFA).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setPlafondGroupeActe({plafondActeEnCours: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
    );

    /* Recherche du sous-acte auquel a droit un assuré*/
    searchAssureSousActe = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadSousActeEnCours),
            mergeMap(({idPGA}) =>
                this.PlafondService.getPlafondSousActeEnCours(idPGA).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setPlafondGroupeSousActe({plafondSousActeEnCours: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
    );
}
