import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TierPayantService} from './service';
import * as featureActions from './action';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import {Report} from '../../contrat/police/model';

@Injectable()
export class TierPayantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private tierPayantService: TierPayantService
    ) {
    }

    createTierPayant$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTierPayant),
        mergeMap(({tierPayant}) =>
            this.tierPayantService.posTierPayant(tierPayant).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTierPayant()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        createTierPayantNoList$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTierPayantNoList),
        mergeMap(({tierPayant}) =>
            this.tierPayantService.posTierPayant1(tierPayant).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTierPayant()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    loadTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayant),
            mergeMap(() =>
                this.tierPayantService.$getTierPayant().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    fetchReportTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.FetchReportTierPayant),
            mergeMap((report: Report) =>
                this.tierPayantService.$getReport(report).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setReportTierPayant({reportFile: value})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    /** update etat tier payant */
    updateEtatValiderTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateEtatValiderTierPayant),
            mergeMap(({tierPayant, etat}) =>
                this.tierPayantService.putUpdateTierPayant(tierPayant, etat).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTierPayant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    /** lister tous les ordres de reglement valide */
   /* loadTierPayantReglementValide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayantOrdreReglementValide),
            mergeMap(() =>
                this.tierPayantService.$getTierPayantOrdreReglementValide().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayantLoadOrdreReglement(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));*/

    loadTierPayantValide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayantValide),
            mergeMap(() =>
                this.tierPayantService.$getTierPayantValide().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    /** update etat tier-payant */
    updateETatAnnulerTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateEtatAnnulerTierPayant),
            mergeMap(({tierPayant, etat}) =>
                this.tierPayantService.putUpdateTierPayant(tierPayant, etat).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTierPayantValide()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    /** creer un ordre de reglement */
    createTierPayantOrdreReglement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.createTierPayantOrdreReglement),
            mergeMap(({tierPayant}) =>
                this.tierPayantService.postTierPayantOrdreReglement(tierPayant).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTierPayantValide()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));
    deletePrestation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deletePrestationTierPayant),
            mergeMap((prestation) =>
                this.tierPayantService.deletePrestation(prestation).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTierPayant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    /** delete TieerPayant */
    deletePrefinancement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deleteTierPayant),
            mergeMap(({tierPayant}) =>
                this.tierPayantService.deleteTierPayant(tierPayant).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTierPayant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    loadReglementTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadOrdreReglementTierPayant),
            mergeMap(() =>
                this.tierPayantService.$getOrdreReglement().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setLoadOrdreReglementTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    /* Valider ordre de reglement */

    updateEtatValiderOrdreReglement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.validerTierPayantOrdreReglement),
            mergeMap(({ordre, etat}) =>
                this.tierPayantService.putUpdateTierPayantOrdreReglement(ordre, etat).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                       featureActions.loadTierPayantOrdreReglementValide()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    loadReglementValide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayantOrdreReglementValide),
            mergeMap(() =>
                this.tierPayantService.$getTierPayantOrdreReglementValide().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setLoadOrdreReglementTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        loadTierPayantOrdreReglementFactureInstance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayantOrdreReglementFactureInstance),
            mergeMap(() =>
                this.tierPayantService.$getTierPayantOrdreReglementFactureIstance().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setLoadOrdreReglementTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        loadTierPayantOrdreReglementFacturePaye$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadTierPayantOrdreReglementFacturePaye),
            mergeMap(() =>
                this.tierPayantService.$getTierPayantOrdreReglementFacturePaye().pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setLoadOrdreReglementTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    updateETatDeValiderOrdreReglement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deValiderOrdreReglement),
            mergeMap(({ordre, etat}) =>
                this.tierPayantService.putUpdateTierPayantOrdreReglement(ordre, etat).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTierPayantOrdreReglementValide()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        validerPaiement$ = createEffect(() =>
        this.actions$.pipe(
                ofType(featureActions.validerPaiement),
                mergeMap(({ordre}) =>
                    this.tierPayantService.paiementFacture(ordre).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                           featureActions.loadTierPayantOrdreReglementFactureInstance()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));
                devaliderPaiement$ = createEffect(() =>
                this.actions$.pipe(
                        ofType(featureActions.devaliderPaiement),
                        mergeMap(({ordre}) =>
                            this.tierPayantService.devaliderPaiementFacture(ordre).pipe(
                                switchMap(value => [
                                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                   featureActions.loadTierPayantOrdreReglementFacturePaye()
                                ]),
                                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            ))
                        ));
    /** delete ordre de reglement */
    deleteOrdreDeReglement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deleteTierPayantOrdreDeReglement),
            mergeMap(({ordreReglement}) =>
                this.tierPayantService.deleteOrdreReglement(ordreReglement).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadOrdreReglementTierPayant()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    checkTierPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.checkTierPayant),
            mergeMap(({tierPayant}) =>
                this.tierPayantService.checkTierPayant(tierPayant).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayantResponse(value)
                    ]),
                    catchError(error => {
                        featureActions.setTierPayantResponse(null);
                        console.log('test');
                        return of(GlobalConfig.setStatus(StatusEnum.error, null, error));
                    })
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

    searchTiersPayant$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.searchTiersPayant),
            mergeMap(({matricule, dateDeclaration}) =>
                this.tierPayantService.searchTiersPayant(matricule, dateDeclaration).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        searchTiersPayantFacture$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.searchTiersPayantByFacture),
            mergeMap(({numeroFacture, dateDeclaration}) =>
                this.tierPayantService.searchTiersPayantByFacture(numeroFacture, dateDeclaration).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

        searchTierPayantOrdreReglement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.searchTierPayantOrdreReglement),
            mergeMap(({numero, date}) =>
                this.tierPayantService.searchTierPayantOrdreReglement(numero, date).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setLoadOrdreReglementTierPayant(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

}
