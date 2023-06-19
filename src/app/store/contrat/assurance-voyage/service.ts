import {AssuranceVoyage, AssuranceVoyageList} from "./model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class AssuranceVoyageService {
constructor(private http: HttpClient) {}

posAssuranceVoyage(assuranceVoyage: AssuranceVoyage): Observable<any> {
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ASSURANCE_VOYAGE)}`, assuranceVoyage);
}

$getAssuranceVoyages(): Observable<AssuranceVoyageList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ASSURANCE_VOYAGE)}`).pipe(
    map((response: AssuranceVoyageList) => response),
    catchError(this.handleError())
  );
  }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

