import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeAll, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import {  OperationService } from './service';
import * as featureActions from './actions';
import { Operation } from './model';
import { Report } from '../../contrat/police/model';

@Injectable()
export class OperationEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private operationService: OperationService,
    ) {
    }


    createOperation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createOperation),
        mergeMap((operation:  Operation) =>
            this.operationService.posOperation(operation).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadOperationByExerciceOperation({exerciceOperationId: operation.exerciceComptableOperation.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateOperation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateOperation),
            mergeMap((operation: Operation) =>
                this.operationService.updateOperation(operation).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadOperationByExerciceOperation({exerciceOperationId: operation.exerciceComptableOperation.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

         

            deleteOperation$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteOperation),
                mergeMap((operation: Operation) =>
                    this.operationService.deleteOperation(operation).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadOperationByExerciceOperation({exerciceOperationId: operation.exerciceComptableOperation.id})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

            findOperationCaisseJournalier$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.findOperationCaisseJournalier),
                mergeMap((operation: Operation) =>
                    this.operationService.findOperationCaisseJournalier(operation).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setOperation(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                )); 
                
                findOperationGrandLivre$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.findOperationGrandLivre),
                    mergeMap((operation: Operation) =>
                        this.operationService.findOperationGrandLivre(operation).pipe(
                            switchMap(value => [
                               // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.setOperation(value)
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    )); 


                
                    findOperationGrandLivreAuxiliaire$ = createEffect(() =>
                    this.actions$.pipe(
                        ofType(featureActions.findOperationGrandLivreAuxiliaire),
                        mergeMap((operation: Operation) =>
                            this.operationService.findOperationGrandLivreAuxiliaire(operation).pipe(
                                switchMap(value => [
                                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                    featureActions.setOperation(value)
                                ]),
                                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            ))
                        )); 

                fetchReportArreter$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.FetchReport),
                    mergeMap((report: Report) =>
                        this.operationService.$getReport(report).pipe(
                            switchMap(value => [
                                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.setReportArrete({reportFile: value})
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            // catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        ))
                    ));
   
    fetchOperation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadOperation),
        mergeMap(() =>
            this.operationService.$getOperation().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setOperation(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    fetchOperationByExerciceOperation$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadOperationByExerciceOperation),
        mergeMap(({exerciceOperationId}) =>
            this.operationService.$getOperationByExerciceOperation(exerciceOperationId).pipe(
                switchMap(value => [
                    featureActions.setOperation(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    
    fetchOperationByExerciceOperationLeutree$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadOperationByExerciceOperation),
        mergeMap(({exerciceOperationId}) =>
            this.operationService.$getOperationByExerciceOperationLeutree(exerciceOperationId).pipe(
                switchMap(value => [
                    featureActions.setOperation(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

}