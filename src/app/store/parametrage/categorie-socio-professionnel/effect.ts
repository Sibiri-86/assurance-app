import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { CategorieSocioProfessionnelService } from './service';
import * as featureActions from './actions';
import {CategorieSocioProfessionnel} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class CategorieSocioProfessionnelEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private CategorieSocioProfessionnelService: CategorieSocioProfessionnelService
    ) {
    }

    createCategorieSocioProfessionnel$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createCategorieSocioProfessionnel),
        mergeMap((CategorieSocioProfessionnel: CategorieSocioProfessionnel) =>
            this.CategorieSocioProfessionnelService.posCategorieSocioProfessionnel(CategorieSocioProfessionnel).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadCategorieSocioProfessionnel()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateCategorieSocioProfessionnel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateCategorieSocioProfessionnel),
            mergeMap((CategorieSocioProfessionnel: CategorieSocioProfessionnel) =>
                this.CategorieSocioProfessionnelService.updateCategorieSocioProfessionnel(CategorieSocioProfessionnel).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadCategorieSocioProfessionnel()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteCategorieSocioProfessionnel$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteCategorieSocioProfessionnel),
                mergeMap((CategorieSocioProfessionnel: CategorieSocioProfessionnel) =>
                    this.CategorieSocioProfessionnelService.deleteCategorieSocioProfessionnel(CategorieSocioProfessionnel).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadCategorieSocioProfessionnel()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));  
                
                
                
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importCategorieSocioProfessionnel),
    mergeMap(({file}) =>
        this.CategorieSocioProfessionnelService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadCategorieSocioProfessionnel()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

    fetchCategorieSocioProfessionnel$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadCategorieSocioProfessionnel),
        mergeMap(() =>
            this.CategorieSocioProfessionnelService.$getCategorieSocioProfessionnels().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setCategorieSocioProfessionnel(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

}