import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { SecteurActiviteService } from './service';
import * as featureActions from './actions';
import {SecteurActivite, SecteurActiviteList} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class SecteurActiviteEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private secteurActiviteService: SecteurActiviteService
    ) {
    }

    createSecteurActivite$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createSecteurActivite),
        mergeMap((secteurActivite: SecteurActivite) =>
            this.secteurActiviteService.postSecteurActivite(secteurActivite).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadSecteurActivite()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )))
        );

     updateSecteurActivite$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateSecteurActivite),
            mergeMap((secteurActivite: SecteurActivite) =>
                this.secteurActiviteService.updateSecteurActivite(secteurActivite).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadSecteurActivite()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )))
            );

     deleteSecteurActivite$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteSecteurActivite),
                mergeMap((secteurActivite: SecteurActivite) =>
                    this.secteurActiviteService.deleteSecteurActivite(secteurActivite).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadSecteurActivite()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )))
                );    

    fetchSecteurActivite$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadSecteurActivite),
        mergeMap(() =>
            this.secteurActiviteService.getSecteurActivites().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setSecteurActivite(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
   )
   );

importSecteurDactivite$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importSecteurActivite),
    mergeMap(({file}) =>
        this.secteurActiviteService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadSecteurActivite()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);
}