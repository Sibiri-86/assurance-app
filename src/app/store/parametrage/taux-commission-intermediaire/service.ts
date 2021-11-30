import { from } from "rxjs";
import {TauxCommissionIntermediaire, TauxCommissionIntermediaireList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class TauxCommissionIntermediaireService {
constructor(private http: HttpClient) {}

$getTauxCommissionIntermediaires(): Observable<TauxCommissionIntermediaireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TAUXCOMMISSIONINTERMEDIAIRE)}`).pipe(
      map((response: TauxCommissionIntermediaireList) => response),
      catchError(this.handleError())
    );
  }

posTauxCommissionIntermediaire(tauxcommissionintermediaire: TauxCommissionIntermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TAUXCOMMISSIONINTERMEDIAIRE)}`, tauxcommissionintermediaire);
  }

updateTauxCommissionIntermediaire(tauxcommissionintermediaire: TauxCommissionIntermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TAUXCOMMISSIONINTERMEDIAIRE)}/${tauxcommissionintermediaire.id}`, tauxcommissionintermediaire);
  }

deleteTauxCommissionIntermediaire(tauxcommissionintermediaire: TauxCommissionIntermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TAUXCOMMISSIONINTERMEDIAIRE)}/${tauxcommissionintermediaire.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TAUXCOMMISSIONINTERMEDIAIRE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

