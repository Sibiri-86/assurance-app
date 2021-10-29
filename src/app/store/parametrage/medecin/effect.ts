import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { MedecinService } from './service';
import * as featureActions from './actions';
import {Medecin} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class MedecinEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private MedecinService: MedecinService
    ) {
    }

    createMedecin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createMedecin),
        mergeMap((Medecin: Medecin) =>
            this.MedecinService.posMedecin(Medecin).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadMedecin()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateMedecin$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateMedecin),
            mergeMap((Medecin: Medecin) =>
                this.MedecinService.updateMedecin(Medecin).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadMedecin()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteMedecin$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteMedecin),
                mergeMap((Medecin: Medecin) =>
                    this.MedecinService.deleteMedecin(Medecin).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadMedecin()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchMedecin$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadMedecin),
        mergeMap(() =>
            this.MedecinService.$getMedecins().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setMedecin(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importMedecin),
    mergeMap(({file}) =>
        this.MedecinService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadMedecin()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}