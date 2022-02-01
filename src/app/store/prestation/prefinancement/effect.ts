import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PrefinancementService } from './service';
import * as featureActions from './action';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { Prefinancement } from './model';
import { Report } from '../../contrat/police/model';

@Injectable()
export class PrefinancementEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private prefinancementService: PrefinancementService
    ) {
    }

    loadPrefinancement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPrefinancement),
        mergeMap(() =>
            this.prefinancementService.$getPrefinancement().pipe(
                switchMap(value => [
                    // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPrefinancement(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    loadReglement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadOrdreReglement),
        mergeMap(() =>
            this.prefinancementService.$getOrdreReglement().pipe(
                switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.setLoadOrdreReglement(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

        /** delete prefinancement */
            deletePrefinancement$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePrefinancement),
                mergeMap(({prefinancement}) =>
                    this.prefinancementService.deletePrefinancement(prefinancement).pipe(
                        switchMap(value => [
                                // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPrefinancement()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));
        /** delete ordre de reglement */
        deleteOrdreDeReglement$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteOrdreDeReglement),
                mergeMap(({ordreReglement}) =>
                    this.prefinancementService.deleteOrdreReglement(ordreReglement).pipe(
                        switchMap(value => [
                                // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadOrdreReglement()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));
        /** lister tous les ordres de reglement valide */
        loadReglementValide$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadOrdreReglementValide),
                mergeMap(() =>
                    this.prefinancementService.$getOrdreReglementValide().pipe(
                        switchMap(value => [
                                // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setLoadOrdreReglement(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

    loadPrefinancementValide$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPrefinancementValide),
        mergeMap(() =>
            this.prefinancementService.$getPrefinancementValide().pipe(
                switchMap(value => [
                    // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPrefinancement(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    createPrefinancement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPrefinancement),
        mergeMap(({prefinancement}) =>
            this.prefinancementService.posPrefinancement(prefinancement).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPrefinancement()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    checkPrefinancement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.checkPrefinancement),
        mergeMap(({prefinancement}) =>
            this.prefinancementService.checkPrefinancement(prefinancement).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    //featureActions.loadPrefinancement()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    deletePrestation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.deletePrestation),
        mergeMap((prestation) =>
            this.prefinancementService.deletePrestation(prestation).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPrefinancement()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    /**creer un ordre de reglement */
    createOrdreReglement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createOrdreReglement),
        mergeMap(({prefinancement}) =>
            this.prefinancementService.posOrdreReglement(prefinancement).pipe(
                switchMap(value => [
                    // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPrefinancementValide()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    /**update etat prefinancement */
    updateETatAnnulerPrefinancement$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.updateEtatAnnulerPrefinancement),
            mergeMap(({prefinancement, etat}) =>
                this.prefinancementService.putUpdatePrefinancement(prefinancement, etat).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPrefinancementValide()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

              /**update etat prefinancement */
    updateETatValiderPrefinancement$ = createEffect(() =>
    this.actions$.pipe(
            ofType(featureActions.updateEtatValiderPrefinancement),
            mergeMap(({prefinancement, etat}) =>
                this.prefinancementService.putUpdatePrefinancement(prefinancement, etat).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPrefinancement()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            updateETatValiderOrdreReglement$ = createEffect(() =>
            this.actions$.pipe(
                    ofType(featureActions.validerOrdreReglement),
                    mergeMap(({ordre, etat}) =>
                        this.prefinancementService.putUpdateOrdreReglement(ordre, etat).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadOrdreReglement()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

                updateETatDeValiderOrdreReglement$ = createEffect(() =>
                    this.actions$.pipe(
                            ofType(featureActions.deValiderOrdreReglement),
                            mergeMap(({ordre, etat}) =>
                                this.prefinancementService.putUpdateOrdreReglement(ordre, etat).pipe(
                                    switchMap(value => [
                                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                        featureActions.loadOrdreReglementValide()
                                    ]),
                                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                ))
                            ));

            updateETatAnnulerOrdreReglement$ = createEffect(() =>
                    this.actions$.pipe(
                            ofType(featureActions.annulerOrdreReglement),
                            mergeMap(({ordre, etat}) =>
                                this.prefinancementService.putUpdateOrdreReglement(ordre, etat).pipe(
                                    switchMap(value => [
                                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                        featureActions.loadOrdreReglementValide()
                                    ]),
                                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                ))
                            ));

                        fetchReportPrestation$ = createEffect(() =>
                            this.actions$.pipe(
                                ofType(featureActions.FetchReportPrestation),
                                mergeMap((report: Report) =>
                                    this.prefinancementService.$getReport(report).pipe(
                                        switchMap(value => [
                                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                            featureActions.setReportPrestation({reportFile: value})
                                        ]),
                                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    ))
                                ));
}
