import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { ExerciceComptableOperationService } from './service';
import * as featureActions from './actions';

@Injectable()
export class ExerciceComptableOperationEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private exerciceComptableOperationService: ExerciceComptableOperationService,
    ) {
    }

   
    fetchExerciceComptable$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadExerciceComptableOperation),
        mergeMap(() =>
            this.exerciceComptableOperationService.$getExerciceComptableOperation().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setExerciceComptableOperation(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchExerciceComptableByJournal$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadExerciceComptableOperationByJournal),
        mergeMap(({journalId}) =>
            this.exerciceComptableOperationService.$getExerciceComptableOperationByJournal(journalId).pipe(
                switchMap(value => [
                    featureActions.setExerciceComptableOperation(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    
    fetchOperations$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadOperations),
                mergeMap(() =>
                    this.exerciceComptableOperationService.$getOperations().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setOperations(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
    );

}