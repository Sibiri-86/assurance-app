import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {catchError, map} from 'rxjs/operators';
import {createRequestOption} from '../../../module/util/loader-util';
import { Foire, FoireList } from './model';

@Injectable({providedIn: 'root'})
export class FoireService {
	constructor(private http: HttpClient) {}

  

	$getFoires(): Observable<FoireList> {
		// @FIXME: get request
		return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_FOIRE)}`).pipe(
		  map((response: FoireList) => response),
		  catchError(this.handleError())
		);
	  }
	
	posFoire(foire: Foire): Observable<any> {
		// @FIXME: post request
		return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_FOIRE)}`, foire);
	  }
	
	updateFoire(foire: Foire): Observable<any> {
		// @FIXME: post request
		return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_FOIRE)}/${foire.id}`, foire);
	  }
	
	deleteGarant(foire: Foire): Observable<any> {
		// @FIXME: post request
		return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_FOIRE)}/${foire.id}`, null);
	};

	private handleError<T>() {
		return (error: HttpErrorResponse) => {
			return throwError(error.message || 'Something went wrong');
		};
	  }
}





 


