import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { SecteurService } from './service';
import * as featureActions from './actions';
import {Secteur} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SecteurEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private secteurService: SecteurService
    ) {
    }

    createSecteur$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createSecteur),
        mergeMap((secteur: Secteur) =>
            this.secteurService.posSecteur(secteur).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadSecteur()
                ]),
                catchError((error: HttpErrorResponse) => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateSecteur$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateSecteur),
            mergeMap((secteur: Secteur) =>
                this.secteurService.updateSecteur(secteur).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadSecteur()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            deleteSecteur$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.deleteSecteur),
                mergeMap((secteur: Secteur) =>
                    this.secteurService.deleteSecteur(secteur).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadSecteur()
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));    

    fetchSecteur$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadSecteur),
        mergeMap(() =>
            this.secteurService.$getSecteurs().pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setSecteur(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

}