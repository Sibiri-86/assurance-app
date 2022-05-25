import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { BulletinAdhesionService } from './service';
import * as featureActions from './actions';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';
import { BulletinAdhesion, BulletinAdhesionList } from './model';

@Injectable()
export class BulletinAdhesionEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private bulletinAdhesionService: BulletinAdhesionService
    ) {
    }

    createBulletin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createBulletin),
        mergeMap((bulletinn: BulletinAdhesion) =>
            this.bulletinAdhesionService.posBulletin(bulletinn).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadBulletin()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    valideBulletin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.valideBulletin),
        mergeMap((bulletin: BulletinAdhesion) =>
            this.bulletinAdhesionService.posInvalideBulletin(bulletin).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadBulletin()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

    invalideBulletin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.invalideBulletin),
            mergeMap((bulletin: BulletinAdhesion) =>
                this.bulletinAdhesionService.posInvalideBulletin(bulletin).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadBulletin()
                    ]),
                    catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

     updateBulletin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateBulletin),
            mergeMap((bulletin: BulletinAdhesion) =>
                this.bulletinAdhesionService.updateBulletin(bulletin).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadBulletin()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteBulletin$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteBulletin),
                mergeMap((bulletin: BulletinAdhesion) =>
                    this.bulletinAdhesionService.deleteBulletin(bulletin).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadBulletin()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

                
                deleteBulletins$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.deleteBulletins),
                    mergeMap((bulletin: BulletinAdhesionList) =>
                        this.bulletinAdhesionService.deleteBulletins(bulletin).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadBulletin()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

   /*  fetchReportBon$ = createEffect(() =>
                            this.actions$.pipe(
                                ofType(featureActions.FetchReportBon),
                                mergeMap((report: Report) =>
                                    this.bonPriseEnChargeService.$getReport(report).pipe(
                                        switchMap(value => [
                                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                            featureActions.setReportBon({reportFile: value})
                                        ]),
                                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                        // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                    ))
                                )); */

    fetchBulletin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadBulletin),
        mergeMap(() =>
            this.bulletinAdhesionService.$getBulletin().pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setBulletin(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
}
