import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import { RecapitulatifService} from './service';
import * as featureActions from './action';
import { Recapitulatif } from './model';

@Injectable()
export class TierPayantEffects {
    private successMsg = 'Opération reussie !';
    constructor(
        private actions$: Actions,
        private recaptitulatifService: RecapitulatifService
    ) {
    }

   
    

}
