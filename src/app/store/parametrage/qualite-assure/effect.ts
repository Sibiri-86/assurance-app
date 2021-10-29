import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { QualiteAssureService } from './service';
import * as featureActions from './actions';
import {QualiteAssure} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class QualiteAssureEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private QualiteAssureService: QualiteAssureService
    ) {
    }

    createQualiteAssure$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createQualiteAssure),
        mergeMap((QualiteAssure: QualiteAssure) =>
            this.QualiteAssureService.posQualiteAssure(QualiteAssure).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadQualiteAssure()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateQualiteAssure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateQualiteAssure),
            mergeMap((QualiteAssure: QualiteAssure) =>
                this.QualiteAssureService.updateQualiteAssure(QualiteAssure).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadQualiteAssure()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteQualiteAssure$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteQualiteAssure),
                mergeMap((QualiteAssure: QualiteAssure) =>
                    this.QualiteAssureService.deleteQualiteAssure(QualiteAssure).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadQualiteAssure()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchQualiteAssure$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadQualiteAssure),
        mergeMap(() =>
            this.QualiteAssureService.$getQualiteAssures().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setQualiteAssure(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importQualiteAssure),
    mergeMap(({file}) =>
        this.QualiteAssureService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadQualiteAssure()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}