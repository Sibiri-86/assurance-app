import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { ProfessionService } from './service';
import * as featureActions from './actions';
import {Profession} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class ProfessionEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private ProfessionService: ProfessionService
    ) {
    }

    createProfession$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createProfession),
        mergeMap((Profession: Profession) =>
            this.ProfessionService.posProfession(Profession).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadProfession()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateProfession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateProfession),
            mergeMap((Profession: Profession) =>
                this.ProfessionService.updateProfession(Profession).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadProfession()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteProfession$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteProfession),
                mergeMap((Profession: Profession) =>
                    this.ProfessionService.deleteProfession(Profession).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadProfession()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchProfession$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadProfession),
        mergeMap(() =>
            this.ProfessionService.$getProfessions().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setProfession(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importProfession),
    mergeMap(({file}) =>
        this.ProfessionService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadProfession()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}