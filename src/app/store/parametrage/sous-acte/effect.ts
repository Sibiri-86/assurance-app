import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { SousActeService } from './service';
import * as featureActions from './actions';
import {SousActe, SousActeList} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class SousActeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private sousActeService: SousActeService
    ) {
    }

    createSousActe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createSousActe),
        mergeMap((SousActe: SousActe) =>
            this.sousActeService.posSousActe(SousActe).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadSousActe()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    createEntente$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createEntente),
        mergeMap((sousActes: SousActeList) =>
            this.sousActeService.createEntente(sousActes).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadEntente()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));
    createNewBareme$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createNewBareme),
        mergeMap((sousActes: SousActeList) =>
            this.sousActeService.createNewBareme(sousActes).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadNewBareme()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));  
        deleteNewBareme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deleteNewBareme),
            mergeMap((sousActe: SousActe) =>
                this.sousActeService.deleteEntente(sousActe).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadNewBareme()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            )); 
        deleteEntente$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deleteEntente),
            mergeMap((sousActe: SousActe) =>
                this.sousActeService.deleteEntente(sousActe).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadEntente()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            )); 
     updateSousActe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateSousActe),
            mergeMap((sousActe: SousActe) =>
                this.sousActeService.updateSousActe(sousActe).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadSousActe()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteSousActe$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteSousActe),
                mergeMap((sousActe: SousActe) =>
                    this.sousActeService.deleteSousActe(sousActe).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadSousActe()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchSousActe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadSousActe),
        mergeMap(() =>
            this.sousActeService.$getSousActes().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setSousActe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchEntente$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadEntente),
        mergeMap(() =>
            this.sousActeService.$getEntente().pipe(
                switchMap(value => [
                    featureActions.setSousActe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchNewBareme$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadNewBareme),
        mergeMap(() =>
            this.sousActeService.$getNewBareme().pipe(
                switchMap(value => [
                    featureActions.setSousActe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchEntenteExclu$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadEntenteExclu),
        mergeMap(() =>
            this.sousActeService.$getEntenteExclus().pipe(
                switchMap(value => [
                    featureActions.setSousActe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    loadNewBaremeExclu$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadNewBaremeExclu),
        mergeMap(() =>
            this.sousActeService.$getNewBaremeExclus().pipe(
                switchMap(value => [
                    featureActions.setSousActe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
    importActe$ = createEffect(() =>
    this.actions$.pipe(
    ofType(featureActions.importSousActe),
    mergeMap(({file}) =>
        this.sousActeService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadSousActe()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
));

}