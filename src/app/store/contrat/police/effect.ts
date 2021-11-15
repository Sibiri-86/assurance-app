import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PoliceService } from './service';
import * as featureActions from './actions';
import {Police} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class PoliceEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private PoliceService: PoliceService
    ) {
    }

    createPolice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPolice),
        mergeMap((Police: Police) =>
            this.PoliceService.posPolice(Police).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPolice()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updatePolice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updatePolice),
            mergeMap((Police: Police) =>
                this.PoliceService.updatePolice(Police).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPolice()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

        validerPolice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.validerPolice),
            mergeMap((Police: Police) =>
                this.PoliceService.validerPolice(Police).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPolice()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deletePolice$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePolice),
                mergeMap((Police: Police) =>
                    this.PoliceService.deletePolice(Police).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadPolice()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));  
                
                deletePolices$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.deletePolices),
                    mergeMap(({PoliceList}) =>
                        this.PoliceService.deletePolices(PoliceList).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.loadPolice()
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));

    fetchPolice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPolice),
        mergeMap(() =>
            this.PoliceService.$getPolices().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPolice(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPolice),
    mergeMap(({file}) =>
        this.PoliceService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadPolice()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

    fetchPoliceByAffNouv$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.loadPoliceByAffNouv),
            mergeMap(() =>
                this.PoliceService.getPolicesFilterByAffNou().pipe(
                    switchMap(value => [
                        //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setPoliceByAffNou(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
    );

}
