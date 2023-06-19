import { AssuranceVoyageService } from "./service";
import * as featureActions from '../assurance-voyage/actions';
import { AssuranceVoyage } from "./model";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import {Injectable} from '@angular/core';


@Injectable()
export class AssuranceVoyageEffects {
  private successMsg = 'Opération reussie !';

  constructor(
	private actions$: Actions,
	private assuranceVoyageService: AssuranceVoyageService
  ) {}

  posAssuranceVoyage$ = createEffect(() =>
  this.actions$.pipe(
	  ofType(featureActions.createAssuranceVoyage),
	  mergeMap((assuranceVoyage: AssuranceVoyage) =>
		  this.assuranceVoyageService.posAssuranceVoyage(assuranceVoyage).pipe(
			  switchMap(value => [
				  GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
				  featureActions.loadAssuranceVoyageList()
			  ]),
			  catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
			  //catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
		  ))
	  ));

  /*  updateFoire$ = createEffect(() =>
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
			  ));   */
			  
			  

  fetchAssuranceVoyage$ = createEffect(() =>
  this.actions$.pipe(
	  ofType(featureActions.loadAssuranceVoyageList),
	  mergeMap(() =>
		  this.assuranceVoyageService.$getAssuranceVoyages().pipe(
			  switchMap(value => [
				  //GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
				  featureActions.setAssuranceVoyage(value)
			  ]),
			  catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
		  )
	  )
  )
  );
  }


