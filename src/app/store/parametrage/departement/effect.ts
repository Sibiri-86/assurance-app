import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { DepartementService } from './service';
import * as featureActions from './actions';
import {Departement} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class DepartementEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private DepartementService: DepartementService
    ) {
    }

    createDepartement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createDepartement),
        mergeMap((Departement: Departement) =>
            this.DepartementService.posDepartement(Departement).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadDepartement()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateDepartement$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateDepartement),
            mergeMap((Departement: Departement) =>
                this.DepartementService.updateDepartement(Departement).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadDepartement()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteDepartement$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteDepartement),
                mergeMap((Departement: Departement) =>
                    this.DepartementService.deleteDepartement(Departement).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadDepartement()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchDepartement$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadDepartement),
        mergeMap(() =>
            this.DepartementService.$getDepartements().pipe(
                switchMap(value => [
                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setDepartement(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importDepartement),
    mergeMap(({file}) =>
        this.DepartementService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadDepartement()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}