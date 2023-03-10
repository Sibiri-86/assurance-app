import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { SousActe } from '../sous-acte/model';
import { QuartierPrestataireGarantService } from './service';
import { QuartierPrestataireGarant } from './model';


@Injectable()
export class QuartierPrestataireGarantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private quartierPrestataireService: QuartierPrestataireGarantService
    ) {
    }

    createQuartierPrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createQuartierPrestataire),
        mergeMap((quartier: QuartierPrestataireGarant) =>
            this.quartierPrestataireService.posQuartierPrestataire(quartier).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadQuartierPrestataire({quartierId: quartier.quartier.id, garantId: quartier.garant.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateQuartierPrestataire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateQuartierPrestataire),
            mergeMap((quartierPrestataire: QuartierPrestataireGarant) =>
                this.quartierPrestataireService.updateQuartierPrestataire(quartierPrestataire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadQuartierPrestataire({quartierId: quartierPrestataire.quartier.id, garantId: quartierPrestataire.garant.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

         

            deleteQuartierPrestataire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteQuartierPrestataire),
                mergeMap((quartierPrestataire: QuartierPrestataireGarant) =>
                    this.quartierPrestataireService.deleteQuartierPrestataire(quartierPrestataire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadQuartierPrestataire({quartierId: quartierPrestataire.quartier.id, garantId: quartierPrestataire.garant.id})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchQuartierPrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadQuartierPrestataire),
        mergeMap(({quartierId, garantId }) =>
            this.quartierPrestataireService.$getQuartierPrestataire(quartierId, garantId).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setQuartierPrestataire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    


}