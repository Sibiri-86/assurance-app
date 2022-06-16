import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { GroupeService } from './service';
import * as featureActions from './actions';
import {Groupe} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class GroupeEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private GroupeService: GroupeService
    ) {
    }

    createGroupe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createGroupe),
        mergeMap((Groupe: Groupe) =>
            this.GroupeService.posGroupe(Groupe).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadGroupe({policeId: Groupe.police.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateGroupe$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateGroupe),
            mergeMap((Groupe: Groupe) =>
                this.GroupeService.updateGroupe(Groupe).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadGroupe({policeId: Groupe.police.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            loadRapportGroupe$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadRapport),
                mergeMap((groupe: Groupe) =>
                    this.GroupeService.rapportGroupe(groupe).pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setRapport(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

        deleteGroupe$ = createEffect(() =>
        this.actions$.pipe(
                ofType(featureActions.deleteGroupe),
                mergeMap((Groupe: Groupe) =>
                    this.GroupeService.deleteGroupe(Groupe).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadGroupe({policeId: Groupe.police.id})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

    
    fetchGroupe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadGroupe),
        mergeMap(({policeId}) =>
            this.GroupeService.$getGroupes(policeId).pipe(
                switchMap(value => [
                    // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setGroupe(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importGroupe),
    mergeMap(({file}) =>
        this.GroupeService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
               // featureActions.loadGroupe()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

}
