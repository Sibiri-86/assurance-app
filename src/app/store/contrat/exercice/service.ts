import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {catchError, map} from 'rxjs/operators';
import {Exercice} from './model';
import {createRequestOption} from '../../../module/util/loader-util';

@Injectable({providedIn: 'root'})
export class ExerciceService {
	constructor(private http: HttpClient) {}

  $getExercices(policeId: string): Observable<Array<Exercice>> {
		console.log('police ID === ' + policeId);
	return this.http.get<Array<Exercice>>( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_EXERCICE)}`,
		{params: createRequestOption({policeId})}).pipe(
	  map((response: Array<Exercice>) => response),
		catchError(this.handleError())
	);
  }

  getActiveExerciceByPolice(policeId: string): Observable<any> {
	return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE_ACTIVE_EXERCICE)}`,
		{params: createRequestOption({policeId})});
  }

  private handleError<T>() {
	return (error: HttpErrorResponse) => {
		return throwError(error.message || 'Something went wrong');
	};
  }
}
