import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { DepenseFamilleService} from './service';
import * as featureActions from './action';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import { Check } from './model';

@Injectable()
export class DepenseFamilleEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private depenseFamilleService: DepenseFamilleService
    ) {
    }

   



    findDepenseFamille$ = createEffect(() =>
        this.actions$.pipe(
            ofType(featureActions.updateDepenseFamille),
            mergeMap((check: Check) =>
                this.depenseFamilleService.findDepenseFamille(check).pipe(
                    switchMap(value => [
                        GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
                        featureActions.setDepenseFamille(value)
                    ]),
                    catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
                ))
        ));

}
