import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from '../foire/actions';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import {Injectable} from '@angular/core';
import { FoireService } from './service';
import { Foire } from './model';


@Injectable()
export class FoireEffects {
  private successMsg = 'Opération reussie !';

  constructor(
	private actions$: Actions,
	private foireService: FoireService
  ) {}

  createFoire$ = createEffect(() =>
  this.actions$.pipe(
	  ofType(featureActions.createFoire),
	  mergeMap((foire: Foire) =>
		  this.foireService.posFoire(foire).pipe(
			  switchMap(value => [
				  GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
				  featureActions.loadFoireList()
			  ]),
			  catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
			  //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
		  ))
	  ));

   updateFoire$ = createEffect(() =>
	  this.actions$.pipe(
		  ofType(featureActions.updateFoire),
		  mergeMap((foire: Foire) =>
			  this.foireService.updateFoire(foire).pipe(
				  switchMap(value => [
					  GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
					  featureActions.loadFoireList()
				  ]),
				  catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				  //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
			  ))
		  ));

		  deleteFoire$ = createEffect(() =>
		  this.actions$.pipe(
			  ofType(featureActions.deleteFoire),
			  mergeMap((foire: Foire) =>
				  this.foireService.deleteGarant(foire).pipe(
					  switchMap(value => [
						  GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
						  featureActions.loadFoireList()
					  ]),
					  catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
					  //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				  ))
			  ));  
			  
			  

  fetchFoire$ = createEffect(() =>
  this.actions$.pipe(
	  ofType(featureActions.loadFoireList),
	  mergeMap(() =>
		  this.foireService.$getFoires().pipe(
			  switchMap(value => [
				  //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
				  featureActions.setFoire(value)
			  ]),
			  catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
		  )
	  )
  )
  );

}
