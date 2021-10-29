import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { NaturePrestataireService } from './service';
import * as featureActions from './actions';
import {NaturePrestataire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class NaturePrestataireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private NaturePrestataireService: NaturePrestataireService
    ) {
    }

    createNaturePrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createNaturePrestataire),
        mergeMap((NaturePrestataire: NaturePrestataire) =>
            this.NaturePrestataireService.posNaturePrestataire(NaturePrestataire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadNaturePrestataire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateNaturePrestataire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateNaturePrestataire),
            mergeMap((NaturePrestataire: NaturePrestataire) =>
                this.NaturePrestataireService.updateNaturePrestataire(NaturePrestataire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadNaturePrestataire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteNaturePrestataire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteNaturePrestataire),
                mergeMap((NaturePrestataire: NaturePrestataire) =>
                    this.NaturePrestataireService.deleteNaturePrestataire(NaturePrestataire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadNaturePrestataire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchNaturePrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadNaturePrestataire),
        mergeMap(() =>
            this.NaturePrestataireService.$getNaturePrestataires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setNaturePrestataire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    import$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.importNaturePrestataire),
        mergeMap(({file}) =>
            this.NaturePrestataireService.pushFileToStorage(file).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadNaturePrestataire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

}