import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { QualiteMedecinService } from './service';
import * as featureActions from './actions';
import {QualiteMedecin} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class QualiteMedecinEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private QualiteMedecinService: QualiteMedecinService
    ) {
    }

    createQualiteMedecin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createQualiteMedecin),
        mergeMap((QualiteMedecin: QualiteMedecin) =>
            this.QualiteMedecinService.posQualiteMedecin(QualiteMedecin).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadQualiteMedecin()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateQualiteMedecin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateQualiteMedecin),
            mergeMap((QualiteMedecin: QualiteMedecin) =>
                this.QualiteMedecinService.updateQualiteMedecin(QualiteMedecin).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadQualiteMedecin()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteQualiteMedecin$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteQualiteMedecin),
                mergeMap((QualiteMedecin: QualiteMedecin) =>
                    this.QualiteMedecinService.deleteQualiteMedecin(QualiteMedecin).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadQualiteMedecin()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchQualiteMedecin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadQualiteMedecin),
        mergeMap(() =>
            this.QualiteMedecinService.$getQualiteMedecins().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setQualiteMedecin(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importQualiteMedecin),
    mergeMap(({file}) =>
        this.QualiteMedecinService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadQualiteMedecin()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}