import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { PathologieService } from './service';
import * as featureActions from './actions';
import {Pathologie} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class PathologieEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private PathologieService: PathologieService
    ) {
    }

    createPathologie$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createPathologie),
        mergeMap((Pathologie: Pathologie) =>
            this.PathologieService.posPathologie(Pathologie).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadPathologie()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updatePathologie$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updatePathologie),
            mergeMap((Pathologie: Pathologie) =>
                this.PathologieService.updatePathologie(Pathologie).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadPathologie()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deletePathologie$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deletePathologie),
                mergeMap((Pathologie: Pathologie) =>
                    this.PathologieService.deletePathologie(Pathologie).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadPathologie()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchPathologie$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadPathologie),
        mergeMap(() =>
            this.PathologieService.$getPathologies().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setPathologie(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPathologie),
    mergeMap(({file}) =>
        this.PathologieService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadPathologie()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}