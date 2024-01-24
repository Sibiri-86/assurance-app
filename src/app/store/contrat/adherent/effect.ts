import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { AdherentService } from './service';
import * as featureActions from './actions';
import * as featureActionsPolice from '../police/actions';
import {Adherent, AdherentFamille, ConditionGenerale} from './model';
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

  createConditionGenerale$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.createConditionGenerale),
        mergeMap((conditionGenerale: ConditionGenerale) =>
            this.AdherentService.posConditionGenerale(conditionGenerale).pipe(
                switchMap(value => [
                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                    featureActions.loadConditionGenerale()
                ]),
                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
            ))
        ));


        deleteConditionGenerale$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.deleteConditionGenerale),
            mergeMap((conditionGenerale: ConditionGenerale) =>
                this.AdherentService.deleteConditionGenerale(conditionGenerale).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.loadConditionGenerale()
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
            ));

            fetchAllConditionGenerale$ = createEffect(() =>
            this.actions$.pipe(
                ofType(featureActions.loadConditionGenerale),
                mergeMap(() =>
                    this.AdherentService.getCondition().pipe(
                        switchMap(value => [
                            //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                            featureActions.setConditionGenerale(value)
                        ]),
                        catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                    )
                )
            )
            );
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

        deleteAdherentAll$ = createEffect(() =>
                this.actions$.pipe(
                        ofType(featureActions.deleteAdherents),
                        mergeMap(({adherentList}) =>
                            this.AdherentService.deleteAdherents(adherentList).pipe(
                                switchMap(value => [
                                    GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                    featureActions.loadAdherent({idGroupe: adherentList[0].groupe.id})
                                ]),
                                catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                                //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                            ))
                        ));
    fetchAdherentAll$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.loadAdherentAll),
                    mergeMap(({idGarantie, idPolice, exoId}) =>
                        this.AdherentService.$getAdherentsAll(idGarantie, idPolice, exoId).pipe(
                            switchMap(value => [
                                //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.setAdherent(value)
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        )
                    )
                )
                );

                fetchAdherentDistinct$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.loadAdherentDistinct),
                    mergeMap(({idGarantie, idPolice}) =>
                        this.AdherentService.$getAdherentsDistinct(idGarantie, idPolice).pipe(
                            switchMap(value => [
                                //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                                featureActions.setAdherent(value)
                            ]),
                            catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                        )
                    )
                )
                );  
                fetchAdherentDistinctGroupe$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(featureActions.loadAdherentDistinctGroupe),
                    mergeMap(({idGarantie, idPolice, idGroupe}) =>
                        this.AdherentService.$getAdherentsDistinctGroupe(idGarantie, idPolice, idGroupe).pipe(
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

    fetchListeAcutaliseeByExercice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadListeActualiseeByExercice),
        mergeMap(({exerciceId}) =>
            this.AdherentService.getListeActualiseeFinal(exerciceId).pipe(
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

    fetchAdherentGroupeAndExercice$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAdherentGroupeAndExercice),
        mergeMap(({idGroupe, idExercice}) =>
            this.AdherentService.getAdherentByGroupeAndExercice(idGroupe, idExercice).pipe(
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

importCondition$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importCondition),
    mergeMap(({file}) =>
        this.AdherentService.pushCondition(file).pipe(
            switchMap(value => [
                GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
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

importCarteAdherentLot$ = createEffect(() =>
this.actions$.pipe(
    ofType(featureActions.importCarteAdherentLot),
    mergeMap(({file, idExercice}) =>
        this.AdherentService.pushcarteAdherentLot(file,idExercice).pipe(
            switchMap(value => [
              //  GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
            //    featureActions.loadAdherentByExercice(idExercice)
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


    fetchAdherentsByExerciceAndGroupeId$ = createEffect(() =>
    this.actions$.pipe(
        ofType(featureActions.loadAdherentByExercice),
        mergeMap(({idGroupe, exerciceId}) =>
            this.AdherentService.$getAdherentsByExerciceAndGroupeId(idGroupe,exerciceId).pipe(
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
