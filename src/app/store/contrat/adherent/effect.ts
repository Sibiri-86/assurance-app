import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { AdherentService } from './service';
import * as featureActions from './actions';
import * as featureActionsPolice from '../police/actions';
import {Adherent, AdherentFamille} from './model';
import {GlobalConfig} from '../../../../app/config/global.config';
import {StatusEnum} from '../../global-config/model';

@Injectable()
export class AdherentEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private AdherentService: AdherentService
    ) {
    }

    createAdherent$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createAdherent),
        mergeMap((Adherent: Adherent) =>
            this.AdherentService.posAdherent(Adherent).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadAdherent({idGroupe: Adherent.groupe.id})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

        createAdherentWithFamille$ = createEffect(() =>
        this.actions$.pipe(
        ofType(featureActions.createAdherentwithFamille),
        mergeMap((adherent: AdherentFamille) =>
            this.AdherentService.posAdherentWithFamille(adherent).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadAdherent({idGroupe: adherent.adherent.groupe.id}),
                    featureActionsPolice.loadRapport(adherent.adherent.groupe.police),
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));

     updateAdherent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateAdherent),
            mergeMap((Adherent: Adherent) =>
                this.AdherentService.updateAdherent(Adherent).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadAdherent({idGroupe: Adherent.groupe.id})
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

        deleteAdherent$ = createEffect(() =>
        this.actions$.pipe(
                ofType(featureActions.deleteAdherent),
                mergeMap((Adherent: Adherent) =>
                    this.AdherentService.deleteAdherent(Adherent).pipe(
                        switchMap(value => [
                            GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.loadAdherent({idGroupe: Adherent.groupe.id})
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    ))
                ));

    fetchAdherentAll$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.loadAdherentAll),
                    mergeMap(({idGarantie, idPolice}) =>
                        this.AdherentService.$getAdherentsAll(idGarantie, idPolice).pipe(
                            switchMap(value => [
                                //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.setAdherent(value)
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        )
                    )
                )
                );

    fetchAdherent$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAdherent),
        mergeMap(({idGroupe}) =>
            this.AdherentService.$getAdherents(idGroupe).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setAdherent(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );
    fetchListeAcutalisee$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadListeActualisee),
        mergeMap(({policeId}) =>
            this.AdherentService.getListeActualisee(policeId).pipe(
                switchMap(value => [
                    featureActions.setListeActualisee({listeActualisee: value})
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

     fetchAdherentGroupe$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAdherentGroupe),
        mergeMap(({idGroupe}) =>
            this.AdherentService.getAdherentByGroupe(idGroupe).pipe(
                switchMap(value => [
                    featureActions.setAdherent(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    ); 

import$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importAdherent),
    mergeMap(({file}) =>
        this.AdherentService.pushFileToStorage(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
               // featureActions.loadAdherent()
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

importPhotosAdherent$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPhotosAdherent),
    mergeMap(({file, idAdherent, idGroupe}) =>
        this.AdherentService.pushPhotosAdherent(file, idAdherent).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadAdherent({idGroupe: idGroupe})
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);


searchAdherent$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.searchAdherent),
    mergeMap(({numero}) =>
        this.AdherentService.searchAdherent(numero).pipe(
            switchMap(value => [
                //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.selectedAdherentForSearch(value)
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
) 
);

searchAdherentByNom$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.searchAdherentByNom),
    mergeMap(({nom}) =>
        this.AdherentService.searchAdherentByNom(nom).pipe(
            switchMap(value => [
                //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.selectedAdherentByNomForSearch(value)
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

findAdherents$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.findAdherents),
    mergeMap(({exercice}) =>
        this.AdherentService.findAll(exercice).pipe(
            switchMap(value => [
                //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.setAdherent(value)
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

/**import photo par lot */
importPhotosAdherentLot$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importPhotosAdherentLot),
    mergeMap(({file, idGroupe}) =>
        this.AdherentService.pushPhotosAdherentLot(file).pipe(
            switchMap(value => [
              //  GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                featureActions.loadAdherent({idGroupe: idGroupe})
            ]),
            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
        )
    )
)
);

    /* Recherche d'assuré pour la prestation: cas tier-payant*/
    searchAssure = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.searchAssureAndFamilleActe),
            mergeMap(({numero}) =>
                this.AdherentService.searchAssure(numero).pipe(
                    switchMap(value => [
                        // GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.selectedAdherentForSearch(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                )
            )
        )
    );


    fetchAdherentByExercice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAdherentByExercice),
        mergeMap(({idGroupe, exerciceId}) =>
            this.AdherentService.$getAdherentsByExercice(idGroupe,exerciceId).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.setAdherent(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
    )
    );

searchAdherentByDateSoinsAndMatricule$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.searchAdherentByDateSoinsAndMatricule),
        mergeMap(({dateSoins, matricule}) =>
            this.AdherentService.searchAdherentByDateSoinsAndMatricule(dateSoins, matricule).pipe(
                switchMap(value => [
                    //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.selectedAdherentForSearch(value)
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            )
        )
) 
);

}
