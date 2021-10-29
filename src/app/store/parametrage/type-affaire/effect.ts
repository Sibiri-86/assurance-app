import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { TypeAffaireService } from './service';
import * as featureActions from './actions';
import {TypeAffaire} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class TypeAffaireEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private TypeAffaireService: TypeAffaireService
    ) {
    }

    createTypeAffaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createTypeAffaire),
        mergeMap((TypeAffaire: TypeAffaire) =>
            this.TypeAffaireService.posTypeAffaire(TypeAffaire).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadTypeAffaire()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateTypeAffaire$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateTypeAffaire),
            mergeMap((TypeAffaire: TypeAffaire) =>
                this.TypeAffaireService.updateTypeAffaire(TypeAffaire).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadTypeAffaire()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteTypeAffaire$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteTypeAffaire),
                mergeMap((TypeAffaire: TypeAffaire) =>
                    this.TypeAffaireService.deleteTypeAffaire(TypeAffaire).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadTypeAffaire()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchTypeAffaire$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadTypeAffaire),
        mergeMap(() =>
            this.TypeAffaireService.$getTypeAffaires().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setTypeAffaire(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importTypeAffaire),
    mergeMap(({file}) =>
        this.TypeAffaireService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadTypeAffaire()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}