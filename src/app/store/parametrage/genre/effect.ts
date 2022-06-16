import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { GenreService } from './service';
import * as featureActions from './actions';
import {Genre} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class GenreEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private GenreService: GenreService
    ) {
    }

    createGenre$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createGenre),
        mergeMap((Genre: Genre) =>
            this.GenreService.posGenre(Genre).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadGenre()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateGenre$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateGenre),
            mergeMap((Genre: Genre) =>
                this.GenreService.updateGenre(Genre).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadGenre()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteGenre$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteGenre),
                mergeMap((Genre: Genre) =>
                    this.GenreService.deleteGenre(Genre).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadGenre()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchGenre$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadGenre),
        mergeMap(() =>
            this.GenreService.$getGenres().pipe(
                switchMap(value => [
                   // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setGenre(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

    
import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importGenre),
    mergeMap(({file}) =>
        this.GenreService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadGenre()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}