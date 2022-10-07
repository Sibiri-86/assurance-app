import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { CompteService } from './service';
import {Compte} from './model';


@Injectable()
export class CompteEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private compteService: CompteService
    ) {
    }

    importCompte$ = createEffect(() =>
    this.actions$.pipe(
    ofType(featureActions.importCompte),
    mergeMap(({file}) =>
        this.compteService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadCompte()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
));

createCompte$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createCompte),
        mergeMap((Compte: Compte) =>
            this.compteService.postCompte(Compte).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadCompte()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                
            ))
        ));

        updateCompte$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateCompte),
            mergeMap((Compte: Compte) =>
                this.compteService.updateCompte(Compte).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadCompte()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

    fetchComptes$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadCompte),
                mergeMap(() =>
                    this.compteService.$getComptes().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setCompte(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
    );

    fetchComptesNoRacine$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadCompteNoRacine),
                mergeMap(() =>
                    this.compteService.$getComptesNoRacine().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setCompte(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
    );
}
