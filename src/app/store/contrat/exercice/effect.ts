import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as featureActions from '../exercice/actions';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {StatusEnum} from '../../global-config/model';
import {Injectable} from '@angular/core';
import {ExerciceService} from './service';
import { Exercice } from './model';

@Injectable()
export class ExerciceEffects {
  private successMsg = 'Opération reussie !';

  constructor(
	private actions$: Actions,
	private exerciceService: ExerciceService
  ) {}

	findExerciceByPolice$ = createEffect(() =>
		this.actions$.pipe(
			ofType(featureActions.loadExerciceList),
			mergeMap(({policeId}) =>
				this.exerciceService.$getExercices(policeId).pipe(
					switchMap(value => [
						// GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
						featureActions.setExerciceList({exerciceList: value})
					]),
					catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				)
			)
		));

		findExercices$ = createEffect(() =>
		this.actions$.pipe(
			ofType(featureActions.loadExercices),
			mergeMap(() =>
				this.exerciceService.$getAllExercices().pipe(
					switchMap(value => [
						// GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
						featureActions.setExerciceList({exerciceList: value})
					]),
					catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				)
			)
		));

		findallExercices$ = createEffect(() =>
		this.actions$.pipe(
			ofType(featureActions.loadAllExercices),
			mergeMap(() =>
				this.exerciceService.$findAllExercices().pipe(
					switchMap(value => [
						// GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
						featureActions.setExerciceList({exerciceList: value})
					]),
					catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				)
			)
		));

		clotureExercice$ = createEffect(() =>
		this.actions$.pipe(
			ofType(featureActions.cloture),
			mergeMap((exercice: Exercice) =>
				this.exerciceService.cloture(exercice).pipe(
					switchMap(value => [
						GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
					//	featureActions.loadAllExercices()
					]),
					catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				))
			));


		findLastExerciceByPolice$ = createEffect(() =>
		this.actions$.pipe(
			ofType(featureActions.loadLastExercice),
			mergeMap(({policeId}) =>
				this.exerciceService.getLastExercice(policeId).pipe(
					switchMap(value => [
						// GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
						featureActions.setLastExercice({lastExercice: value})
					]),
					catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				)
			)
		));

	findActifExerciceByPolice$ = createEffect(() =>
		this.actions$.pipe(
			ofType(featureActions.loadExerciceActif),
			mergeMap(({policeId}) =>
				this.exerciceService.getActiveExerciceByPolice(policeId).pipe(
					switchMap(value => [
						// GlobalConfig.setStatus(StatusEnum.success, this.successMsg),
						featureActions.setExerciceActif({exerciceActif: value})
					]),
					catchError(error => of(GlobalConfig.setStatus(StatusEnum.error, null, error)))
				)
			)
		));
}
