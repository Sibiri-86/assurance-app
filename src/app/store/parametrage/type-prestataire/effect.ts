import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TypePrestataireService } from './service';
import * as featureActions from './actions';
import {TypePrestataire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TypePrestataireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TypePrestataireService: TypePrestataireService
    ) {
    }

    createTypePrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTypePrestataire),
        mergeMap((TypePrestataire: TypePrestataire) =>
            this.TypePrestataireService.posTypePrestataire(TypePrestataire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTypePrestataire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTypePrestataire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTypePrestataire),
            mergeMap((TypePrestataire: TypePrestataire) =>
                this.TypePrestataireService.updateTypePrestataire(TypePrestataire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTypePrestataire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTypePrestataire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTypePrestataire),
                mergeMap((TypePrestataire: TypePrestataire) =>
                    this.TypePrestataireService.deleteTypePrestataire(TypePrestataire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTypePrestataire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTypePrestataire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTypePrestataire),
        mergeMap(() =>
            this.TypePrestataireService.$getTypePrestataires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTypePrestataire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
importGarantie$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTypePrestataire),
    mergeMap(({file}) =>
        this.TypePrestataireService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTypePrestataire()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}