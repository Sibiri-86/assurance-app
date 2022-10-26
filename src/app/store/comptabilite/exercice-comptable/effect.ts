import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { ExerciceComptableService } from './service';
import * as featureActions from './actions';
import { ExerciceComptable } from './model';

@Injectable()
export class ExerciceComptableEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private exerciceComptableService: ExerciceComptableService,
    ) {
    }

    createExerciceComptable$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createExerciceComptable),
        mergeMap((exercice:  ExerciceComptable) =>
            this.exerciceComptableService.posExerciceComptable(exercice).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadExerciceComptable()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateExerciceComptable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateExerciceComptable),
            mergeMap((exercice: ExerciceComptable) =>
                this.exerciceComptableService.updateExerciceComptable(exercice).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadExerciceComptable()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            fermeExerciceComptable$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.fermeExerciceComptable),
                mergeMap((exercice: ExerciceComptable) =>
                    this.exerciceComptableService.fermeExerciceComptable(exercice).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadExerciceComptable()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

            activeExerciceComptable$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.cloture),
                mergeMap((exercice: ExerciceComptable) =>
                    this.exerciceComptableService.activeExerciceComptable(exercice).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadExerciceComptable()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

            deleteExerciceComptable$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteExerciceComptable),
                mergeMap((exercice: ExerciceComptable) =>
                    this.exerciceComptableService.deleteExerciceComptable(exercice).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadExerciceComptable()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchExerciceComptable$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadExerciceComptable),
        mergeMap(() =>
            this.exerciceComptableService.$getExerciceComptable().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setExerciceComptable(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

}